from datetime import datetime, timedelta

from invasive_ai_calendar.models import RawEvent
from invasive_ai_calendar.processor.sessionizer import sessionize


def ev(offset_s: int, app: str, title: str) -> RawEvent:
    base = datetime(2026, 1, 1, 9, 0, 0)
    t = base + timedelta(seconds=offset_s)
    return RawEvent(
        id=f"e-{offset_s}",
        ts_start=t,
        ts_end=t,
        app=app,
        window_title=title,
        bundle_id=f"id.{app}",
        is_idle=False,
        source="test",
    )


def test_sessionize_merges_contiguous_same_context() -> None:
    events = [ev(0, "Code", "main.py"), ev(30, "Code", "main.py"), ev(60, "Code", "main.py")]
    sessions = sessionize(events, inactivity_seconds=120)
    assert len(sessions) == 1
    assert sessions[0].context_features["event_count"] == 3


def test_sessionize_splits_on_context_switch() -> None:
    events = [ev(0, "Code", "main.py"), ev(30, "Chrome", "Docs")]
    sessions = sessionize(events, inactivity_seconds=120)
    assert len(sessions) == 2
