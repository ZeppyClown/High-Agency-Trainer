from __future__ import annotations

from dataclasses import dataclass

from invasive_ai_calendar.classifier.rules import classify_with_rules
from invasive_ai_calendar.models import CategoryPrediction, Session


class LLMAdapter:
    def classify(self, session: Session) -> CategoryPrediction | None:
        return None


@dataclass
class ClassifierConfig:
    model_version: str = "rules-v1"
    prompt_version: str = "none"
    llm_min_confidence: float = 0.5


class ClassifierService:
    def __init__(self, config: ClassifierConfig, llm_adapter: LLMAdapter | None = None) -> None:
        self.config = config
        self.llm_adapter = llm_adapter or LLMAdapter()

    def classify(self, session: Session) -> CategoryPrediction:
        base = classify_with_rules(session, self.config.model_version, self.config.prompt_version)
        if base.confidence >= self.config.llm_min_confidence:
            return base

        fallback = self.llm_adapter.classify(session)
        if fallback:
            fallback.model_version = self.config.model_version
            fallback.prompt_version = self.config.prompt_version
            return fallback
        return base
