from __future__ import annotations

from datetime import datetime, timedelta
from pathlib import Path

from invasive_ai_calendar import db
from invasive_ai_calendar.calendar.builder import build_blocks


def run_calendar_build(db_path: Path, day: datetime) -> int:
    start = day.replace(hour=0, minute=0, second=0, microsecond=0)
    end = start + timedelta(days=1)

    with db.connect(db_path) as conn:
        sessions = db.fetch_sessions_between(conn, start.isoformat(), end.isoformat())
        predictions = db.fetch_predictions_for_sessions(conn, [s.session_id for s in sessions])
        blocks = build_blocks(sessions, predictions)
        db.replace_calendar_blocks(conn, blocks)
        return len(blocks)
