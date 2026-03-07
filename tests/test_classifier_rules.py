from datetime import datetime

from invasive_ai_calendar.classifier.rules import classify_with_rules
from invasive_ai_calendar.models import Session



def test_rule_classifier_matches_code() -> None:
    session = Session(
        session_id="s1",
        start=datetime(2026, 1, 1, 9, 0, 0),
        end=datetime(2026, 1, 1, 9, 10, 0),
        apps=["Cursor"],
        context_features={"dominant_title": "main.py"},
        confidence=1.0,
    )
    prediction = classify_with_rules(session, "rules-v1", "none")
    assert prediction.label == "code"
    assert prediction.confidence > 0.5
