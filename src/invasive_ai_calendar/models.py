from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Any

from pydantic import BaseModel, Field


class BlockStatus(str, Enum):
    SUGGESTED = "suggested"
    CONFIRMED = "confirmed"


class RawEvent(BaseModel):
    id: str
    ts_start: datetime
    ts_end: datetime
    app: str
    window_title: str
    bundle_id: str
    is_idle: bool
    source: str = "collector"


class Session(BaseModel):
    session_id: str
    start: datetime
    end: datetime
    apps: list[str] = Field(default_factory=list)
    context_features: dict[str, Any] = Field(default_factory=dict)
    confidence: float = 1.0


class CategoryPrediction(BaseModel):
    session_id: str
    label: str
    reason: str
    confidence: float
    model_version: str
    prompt_version: str


class CalendarBlock(BaseModel):
    start: datetime
    end: datetime
    category: str
    source_session_ids: list[str] = Field(default_factory=list)
    status: BlockStatus = BlockStatus.SUGGESTED


class ProcessingJob(BaseModel):
    job_id: str
    job_type: str
    payload_json: str
    status: str = "pending"
    retries: int = 0
    max_retries: int = 3

