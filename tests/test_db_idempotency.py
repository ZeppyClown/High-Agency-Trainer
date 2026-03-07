from datetime import datetime
from pathlib import Path

from invasive_ai_calendar import db
from invasive_ai_calendar.models import RawEvent


def test_insert_raw_event_is_idempotent(tmp_path: Path) -> None:
    db_path = tmp_path / "test.sqlite"
    db.init_db(db_path)
    event = RawEvent(
        id="abc123",
        ts_start=datetime(2026, 1, 1, 9, 0, 0),
        ts_end=datetime(2026, 1, 1, 9, 0, 0),
        app="Code",
        window_title="main.py",
        bundle_id="id.code",
        is_idle=False,
        source="test",
    )

    with db.connect(db_path) as conn:
        db.insert_raw_event(conn, event)
        db.insert_raw_event(conn, event)
        count = conn.execute("SELECT COUNT(*) AS c FROM raw_events").fetchone()["c"]

    assert count == 1
