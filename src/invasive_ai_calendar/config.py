from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Settings:
    db_path: Path = Path("./data/aical.sqlite")
    poll_seconds: int = 5
    dedupe_window_seconds: int = 15
    idle_threshold_seconds: int = 120
    model_version: str = "rules-v1"
    prompt_version: str = "none"


def get_settings() -> Settings:
    return Settings()
