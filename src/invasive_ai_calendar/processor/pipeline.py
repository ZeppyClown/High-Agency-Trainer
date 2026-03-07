from __future__ import annotations

from datetime import datetime, timedelta
from pathlib import Path

from invasive_ai_calendar import db
from invasive_ai_calendar.processor.sessionizer import sessionize


def run_sessionization(db_path: Path, day: datetime, inactivity_seconds: int = 120) -> int:
    start = day.replace(hour=0, minute=0, second=0, microsecond=0)
    end = start + timedelta(days=1)

    with db.connect(db_path) as conn:
        events = db.fetch_events_between(conn, start.isoformat(), end.isoformat())
        sessions = sessionize(events, inactivity_seconds=inactivity_seconds)
        for session in sessions:
            db.upsert_session(conn, session)
        return len(sessions)
