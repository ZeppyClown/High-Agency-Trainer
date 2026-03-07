from __future__ import annotations

from datetime import datetime, timedelta
from pathlib import Path

from invasive_ai_calendar import db
from invasive_ai_calendar.classifier.service import ClassifierService


def run_classification(db_path: Path, day: datetime, service: ClassifierService) -> int:
    start = day.replace(hour=0, minute=0, second=0, microsecond=0)
    end = start + timedelta(days=1)

    with db.connect(db_path) as conn:
        sessions = db.fetch_sessions_between(conn, start.isoformat(), end.isoformat())
        for session in sessions:
            prediction = service.classify(session)
            db.upsert_prediction(conn, prediction)
        return len(sessions)
