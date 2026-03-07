from __future__ import annotations

import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterator

from invasive_ai_calendar.models import CalendarBlock, CategoryPrediction, RawEvent, Session

SCHEMA = """
PRAGMA journal_mode=WAL;

CREATE TABLE IF NOT EXISTS raw_events (
  id TEXT PRIMARY KEY,
  ts_start TEXT NOT NULL,
  ts_end TEXT NOT NULL,
  app TEXT NOT NULL,
  window_title TEXT NOT NULL,
  bundle_id TEXT NOT NULL,
  is_idle INTEGER NOT NULL,
  source TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  session_id TEXT PRIMARY KEY,
  start TEXT NOT NULL,
  end TEXT NOT NULL,
  apps_json TEXT NOT NULL,
  context_features_json TEXT NOT NULL,
  confidence REAL NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS category_predictions (
  session_id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  reason TEXT NOT NULL,
  confidence REAL NOT NULL,
  model_version TEXT NOT NULL,
  prompt_version TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS calendar_blocks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  start TEXT NOT NULL,
  end TEXT NOT NULL,
  category TEXT NOT NULL,
  source_session_ids_json TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS processing_jobs (
  job_id TEXT PRIMARY KEY,
  job_type TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  status TEXT NOT NULL,
  retries INTEGER NOT NULL,
  max_retries INTEGER NOT NULL,
  updated_at TEXT NOT NULL
);
"""


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


@contextmanager
def connect(db_path: Path) -> Iterator[sqlite3.Connection]:
    db_path.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def init_db(db_path: Path) -> None:
    with connect(db_path) as conn:
        conn.executescript(SCHEMA)


def insert_raw_event(conn: sqlite3.Connection, event: RawEvent) -> None:
    conn.execute(
        """
        INSERT OR IGNORE INTO raw_events (
          id, ts_start, ts_end, app, window_title, bundle_id, is_idle, source, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            event.id,
            event.ts_start.isoformat(),
            event.ts_end.isoformat(),
            event.app,
            event.window_title,
            event.bundle_id,
            int(event.is_idle),
            event.source,
            utc_now_iso(),
        ),
    )


def fetch_events_between(conn: sqlite3.Connection, start_iso: str, end_iso: str) -> list[RawEvent]:
    rows = conn.execute(
        """
        SELECT * FROM raw_events
        WHERE ts_start >= ? AND ts_end <= ?
        ORDER BY ts_start ASC
        """,
        (start_iso, end_iso),
    ).fetchall()
    return [
        RawEvent(
            id=row["id"],
            ts_start=datetime.fromisoformat(row["ts_start"]),
            ts_end=datetime.fromisoformat(row["ts_end"]),
            app=row["app"],
            window_title=row["window_title"],
            bundle_id=row["bundle_id"],
            is_idle=bool(row["is_idle"]),
            source=row["source"],
        )
        for row in rows
    ]


def upsert_session(conn: sqlite3.Connection, session: Session) -> None:
    import json

    conn.execute(
        """
        INSERT INTO sessions (
          session_id, start, end, apps_json, context_features_json, confidence, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(session_id)
        DO UPDATE SET
          start=excluded.start,
          end=excluded.end,
          apps_json=excluded.apps_json,
          context_features_json=excluded.context_features_json,
          confidence=excluded.confidence,
          created_at=excluded.created_at
        """,
        (
            session.session_id,
            session.start.isoformat(),
            session.end.isoformat(),
            json.dumps(session.apps),
            json.dumps(session.context_features),
            session.confidence,
            utc_now_iso(),
        ),
    )


def fetch_sessions_between(conn: sqlite3.Connection, start_iso: str, end_iso: str) -> list[Session]:
    import json

    rows = conn.execute(
        """
        SELECT * FROM sessions
        WHERE start >= ? AND end <= ?
        ORDER BY start ASC
        """,
        (start_iso, end_iso),
    ).fetchall()
    return [
        Session(
            session_id=row["session_id"],
            start=datetime.fromisoformat(row["start"]),
            end=datetime.fromisoformat(row["end"]),
            apps=json.loads(row["apps_json"]),
            context_features=json.loads(row["context_features_json"]),
            confidence=row["confidence"],
        )
        for row in rows
    ]


def upsert_prediction(conn: sqlite3.Connection, prediction: CategoryPrediction) -> None:
    conn.execute(
        """
        INSERT INTO category_predictions (
          session_id, label, reason, confidence, model_version, prompt_version, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(session_id)
        DO UPDATE SET
          label=excluded.label,
          reason=excluded.reason,
          confidence=excluded.confidence,
          model_version=excluded.model_version,
          prompt_version=excluded.prompt_version,
          created_at=excluded.created_at
        """,
        (
            prediction.session_id,
            prediction.label,
            prediction.reason,
            prediction.confidence,
            prediction.model_version,
            prediction.prompt_version,
            utc_now_iso(),
        ),
    )


def fetch_predictions_for_sessions(
    conn: sqlite3.Connection, session_ids: list[str]
) -> dict[str, CategoryPrediction]:
    if not session_ids:
        return {}

    placeholders = ",".join(["?"] * len(session_ids))
    rows = conn.execute(
        f"""
        SELECT * FROM category_predictions
        WHERE session_id IN ({placeholders})
        """,
        session_ids,
    ).fetchall()

    return {
        row["session_id"]: CategoryPrediction(
            session_id=row["session_id"],
            label=row["label"],
            reason=row["reason"],
            confidence=row["confidence"],
            model_version=row["model_version"],
            prompt_version=row["prompt_version"],
        )
        for row in rows
    }


def replace_calendar_blocks(conn: sqlite3.Connection, blocks: list[CalendarBlock]) -> None:
    import json

    conn.execute("DELETE FROM calendar_blocks")
    for block in blocks:
        conn.execute(
            """
            INSERT INTO calendar_blocks (
              start, end, category, source_session_ids_json, status, created_at
            ) VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                block.start.isoformat(),
                block.end.isoformat(),
                block.category,
                json.dumps(block.source_session_ids),
                block.status.value,
                utc_now_iso(),
            ),
        )
