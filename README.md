# Invasive AI Calendar (macOS-first, local-only)

A learning-first implementation of an OS-level time tracker that captures active windows, sessionizes activity, classifies sessions, and builds calendar-ready blocks.

## What is implemented now

- Event-sourced local pipeline with SQLite persistence.
- Collector service with dedupe/debounce and macOS active-window capture (AppleScript based for v1).
- Deterministic sessionization pipeline.
- Rule-first classifier with optional LLM adapter boundary.
- Calendar block builder with merge logic.
- CLI commands for end-to-end daily flow.
- Tests for sessionization, classifier rules, calendar merges, and idempotent inserts.

## Project structure

- `src/invasive_ai_calendar/collector`: OS capture and polling.
- `src/invasive_ai_calendar/processor`: deterministic sessionization.
- `src/invasive_ai_calendar/classifier`: rule + adapter architecture.
- `src/invasive_ai_calendar/calendar`: block generation.
- `src/invasive_ai_calendar/db.py`: append-only persistence and upserts.
- `tests/`: baseline validation.

## Quick start

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e .[dev]
aical init-db
aical collect-once --mock
aical process-day --day 2026-03-07
aical classify-day --day 2026-03-07
aical calendar-day --day 2026-03-07
aical report-day --day 2026-03-07
```

For real macOS capture, run `aical collect-once` or `aical collect-run` and grant Automation/Accessibility permissions when prompted.

## Roadmap mapping

- Weeks 1-4: implemented scaffold and local collector prototype.
- Weeks 5-8: implemented module split (`collector`, `processor`, `classifier`) and idempotent pipeline.
- Weeks 9-12+: prepared adapter boundaries for LangChain/LLM fallback and correction loop.

## Documentation to study

- Apple platform APIs: https://developer.apple.com/documentation
- Python sqlite3: https://docs.python.org/3/library/sqlite3.html
- Pydantic: https://docs.pydantic.dev
- LangChain Python: https://python.langchain.com
- PyInstaller: https://pyinstaller.org

## Important notes

- This project logs sensitive usage telemetry by design.
- Keep data local while learning.
- Add redaction and encryption before wider use.
