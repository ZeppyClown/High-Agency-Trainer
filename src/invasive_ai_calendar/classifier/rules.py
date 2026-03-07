from __future__ import annotations

from invasive_ai_calendar.models import CategoryPrediction, Session

RULES = [
    ("code", ["code", "cursor", "terminal", "xcode", "pycharm"]),
    ("meeting", ["zoom", "meet", "teams", "slack huddle"]),
    ("research", ["chrome", "safari", "firefox", "docs", "paper"]),
    ("writing", ["notion", "obsidian", "notes", "word"]),
]


def classify_with_rules(session: Session, model_version: str, prompt_version: str) -> CategoryPrediction:
    text = (
        " ".join(session.apps)
        + " "
        + str(session.context_features.get("dominant_title", ""))
    ).lower()

    for label, tokens in RULES:
        if any(token in text for token in tokens):
            return CategoryPrediction(
                session_id=session.session_id,
                label=label,
                reason=f"matched rule tokens for {label}",
                confidence=0.85,
                model_version=model_version,
                prompt_version=prompt_version,
            )

    return CategoryPrediction(
        session_id=session.session_id,
        label="uncategorized",
        reason="no rule matched",
        confidence=0.3,
        model_version=model_version,
        prompt_version=prompt_version,
    )
