from __future__ import annotations

import hashlib
from datetime import timedelta

from invasive_ai_calendar.models import RawEvent, Session


def sessionize(events: list[RawEvent], inactivity_seconds: int = 120) -> list[Session]:
    if not events:
        return []

    events = sorted(events, key=lambda e: e.ts_start)
    sessions: list[Session] = []
    current = [events[0]]

    for event in events[1:]:
        prev = current[-1]
        gap = event.ts_start - prev.ts_end
        same_context = event.app == prev.app and event.window_title == prev.window_title
        if gap <= timedelta(seconds=inactivity_seconds) and same_context and not event.is_idle:
            current.append(event)
        else:
            sessions.append(_to_session(current))
            current = [event]

    sessions.append(_to_session(current))
    return sessions


def _to_session(events: list[RawEvent]) -> Session:
    start = events[0].ts_start
    end = events[-1].ts_end
    apps = sorted({e.app for e in events})
    features = {
        "event_count": len(events),
        "dominant_app": events[-1].app,
        "dominant_title": events[-1].window_title,
        "idle_events": sum(1 for e in events if e.is_idle),
    }

    raw = f"{start.isoformat()}::{end.isoformat()}::{features['dominant_app']}::{features['dominant_title']}"
    session_id = hashlib.sha256(raw.encode("utf-8")).hexdigest()[:24]

    confidence = 1.0 if features["idle_events"] == 0 else 0.6
    return Session(
        session_id=session_id,
        start=start,
        end=end,
        apps=apps,
        context_features=features,
        confidence=confidence,
    )
