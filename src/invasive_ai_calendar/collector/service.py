from __future__ import annotations
import hashlib
import time
from dataclasses import dataclass
from datetime import datetime, timedelta

from invasive_ai_calendar.collector.providers import ActiveWindowProvider
from invasive_ai_calendar.models import RawEvent


@dataclass
class CollectorConfig:
    poll_seconds: int = 5
    dedupe_window_seconds: int = 15
    source: str = "collector"


class CollectorService:
    def __init__(self, provider: ActiveWindowProvider, config: CollectorConfig) -> None:
        self.provider = provider
        self.config = config
        self._last_fingerprint = ""
        self._last_emit_at: datetime | None = None

    def collect_once(self) -> RawEvent | None:
        snap = self.provider.capture()
        fingerprint = self._fingerprint(snap.ts, snap.app, snap.window_title, snap.is_idle)
        now = snap.ts

        if self._last_emit_at and fingerprint == self._last_fingerprint:
            if now - self._last_emit_at < timedelta(seconds=self.config.dedupe_window_seconds):
                return None

        event = RawEvent(
            id=fingerprint,
            ts_start=now,
            ts_end=now,
            app=snap.app,
            window_title=snap.window_title,
            bundle_id=snap.bundle_id,
            is_idle=snap.is_idle,
            source=self.config.source,
        )

        self._last_fingerprint = fingerprint
        self._last_emit_at = now
        return event

    def run_forever(self, emit: callable) -> None:
        while True:
            event = self.collect_once()
            if event:
                emit(event)
            time.sleep(self.config.poll_seconds)

    @staticmethod
    def _fingerprint(ts: datetime, app: str, title: str, is_idle: bool) -> str:
        bucket = ts.replace(second=(ts.second // 5) * 5, microsecond=0)
        raw = f"{bucket.isoformat()}::{app}::{title}::{int(is_idle)}"
        return hashlib.sha256(raw.encode("utf-8")).hexdigest()[:24]
