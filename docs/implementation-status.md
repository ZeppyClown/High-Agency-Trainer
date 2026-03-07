# Implementation Status

## Implemented now
- Phase 1 foundation: collector, schemas, SQLite persistence, CLI.
- Phase 2 baseline: module split, deterministic sessionization, idempotent writes.
- Phase 3 scaffold: rule-first classifier and LLM adapter interface.
- Phase 4 scaffold: calendar block generation and daily summary report.

## Not implemented yet (next milestones)
- Real Quartz/AppKit observer collector.
- Processing job queue with retries and dead-letter handling.
- Human correction workflow persisted and fed to few-shot prompts.
- UI/dashboard for review/edit/export.
- Observability, encryption/redaction, packaging, benchmarking.

## Suggested next coding steps
1. Replace AppleScript capture with Accessibility + Quartz APIs.
2. Add `corrections` table and correction CLI commands.
3. Add first React dashboard reading local SQLite via API layer.
