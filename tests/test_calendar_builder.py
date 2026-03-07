from datetime import datetime

from invasive_ai_calendar.calendar.builder import build_blocks
from invasive_ai_calendar.models import CategoryPrediction, Session


def test_builder_merges_adjacent_same_category() -> None:
    s1 = Session(
        session_id="a",
        start=datetime(2026, 1, 1, 9, 0, 0),
        end=datetime(2026, 1, 1, 9, 20, 0),
        apps=["Code"],
        context_features={"dominant_title": "x"},
        confidence=1.0,
    )
    s2 = Session(
        session_id="b",
        start=datetime(2026, 1, 1, 9, 22, 0),
        end=datetime(2026, 1, 1, 9, 30, 0),
        apps=["Code"],
        context_features={"dominant_title": "y"},
        confidence=1.0,
    )
    preds = {
        "a": CategoryPrediction(
            session_id="a",
            label="code",
            reason="rule",
            confidence=0.8,
            model_version="v1",
            prompt_version="p1",
        ),
        "b": CategoryPrediction(
            session_id="b",
            label="code",
            reason="rule",
            confidence=0.8,
            model_version="v1",
            prompt_version="p1",
        ),
    }
    blocks = build_blocks([s1, s2], preds)
    assert len(blocks) == 1
    assert blocks[0].source_session_ids == ["a", "b"]
