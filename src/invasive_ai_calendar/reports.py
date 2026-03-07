from __future__ import annotations

from collections import defaultdict
from datetime import datetime, timedelta
from pathlib import Path

from invasive_ai_calendar import db


def daily_summary(db_path: Path, day: datetime) -> str:
    start = day.replace(hour=0, minute=0, second=0, microsecond=0)
    end = start + timedelta(days=1)
    per_app_seconds: dict[str, int] = defaultdict(int)

    with db.connect(db_path) as conn:
        sessions = db.fetch_sessions_between(conn, start.isoformat(), end.isoformat())
        predictions = db.fetch_predictions_for_sessions(conn, [s.session_id for s in sessions])

        lines = [f"Daily summary for {start.date().isoformat()}"]
        for session in sessions:
            duration = int((session.end - session.start).total_seconds())
            label = predictions.get(session.session_id).label if session.session_id in predictions else "none"
            app = session.context_features.get("dominant_app", "unknown")
            per_app_seconds[app] += duration
            lines.append(
                f"- {session.start.time()} - {session.end.time()} | {app} | {label} | {duration}s"
            )

        lines.append("\nTop apps:")
        for app, seconds in sorted(per_app_seconds.items(), key=lambda kv: kv[1], reverse=True)[:5]:
            lines.append(f"- {app}: {seconds}s")

    return "\n".join(lines)
