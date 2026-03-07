# ADR 0001: Event-Sourced Local Pipeline

## Status
Accepted

## Context
The tracker needs robust replayability, deterministic processing, and low coupling to AI providers.

## Decision
Store immutable raw activity events in SQLite and derive sessions, predictions, and calendar blocks in downstream steps.

## Consequences
- Pros: deterministic reprocessing, easier debugging, cleaner boundaries.
- Cons: more moving parts than direct in-memory pipelines.
