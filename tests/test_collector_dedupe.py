from datetime import datetime, timedelta
from types import SimpleNamespace
from invasive_ai_calendar.collector.service import CollectorConfig, CollectorService



def test_collector_dedupes_identical_snapshots() -> None:
    # deterministic snapshot returned every call (same object -> same fingerprint)
    snap = SimpleNamespace(
        ts=datetime(2026, 3, 7, 12, 0, 0),
        app="MyApp",
        window_title="Document",
        bundle_id="com.example.myapp",
        is_idle=False,
    )

    class FakeProvider:
        def capture(self):
            return snap

    fake_provider_same_snapshot = FakeProvider()
    service = CollectorService(
        # if identical snapshot within 15s, it should be suppressed. 
        # poll_seconds = how long run_forever() sleeps between polls
        fake_provider_same_snapshot, CollectorConfig(dedupe_window_seconds=15, poll_seconds=1)
    )

    first = service.collect_once()

    # first call should emit an event
    assert first is not None
    assert first.app == "MyApp"
    # second call (same snapshot, within dedupe window) should be suppressed
    assert service.collect_once() is None

def test_collector_emits_when_window_title_changes_within_dedupe_window() -> None:
    snapA = SimpleNamespace(
        ts=datetime(2026, 3, 7, 12, 0, 0),
        app="MyApp",
        window_title="Document",
        bundle_id="com.example.myapp",
        is_idle=False,
    ) 
    
    class FakeProvider:
        current = None
        def capture(self):
            return self.current

    fake = FakeProvider()
    svc = CollectorService(fake, CollectorConfig(dedupe_window_seconds=15))
 

    fake.current = snapA
    first = svc.collect_once()
    # first call should emit
    assert first is not None
    assert first.app == "MyApp"

    # keep timestamp within dedupe window (+1s) but change only the window_title
    snapB = SimpleNamespace(**{**snapA.__dict__, "ts": snapA.ts + timedelta(seconds=1), "window_title": "Other"})
    fake.current = snapB
    second = svc.collect_once()
    # should emit because window_title changed
    assert second is not None
    assert second.id != first.id
    assert second.window_title == "Other"

def test_collector_emits_after_dedupe_window_elapsed() -> None:
    snap = SimpleNamespace(
        ts=datetime(2026, 3, 7, 12, 0, 0),
        app="MyApp",
        window_title="Document",
        bundle_id="com.example.myapp",
        is_idle=False,
    )
    class FakeProvider:
        current = None
        def capture(self):
            return self.current

    provider = FakeProvider()
    provider.current = snap
    svc = CollectorService(provider, CollectorConfig(dedupe_window_seconds=15))
    first = svc.collect_once()
    assert first is not None

    # advance timestamp beyond dedupe window but keep same app/title/is_idle
    provider.current = SimpleNamespace(
        **{**snap.__dict__, 
           "ts": snap.ts + timedelta(seconds=16)
           })
    second = svc.collect_once()
    assert second is not None




    