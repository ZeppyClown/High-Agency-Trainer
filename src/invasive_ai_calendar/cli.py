from __future__ import annotations

from datetime import datetime, timezone

import typer

from invasive_ai_calendar import db
from invasive_ai_calendar.calendar.pipeline import run_calendar_build
from invasive_ai_calendar.classifier.pipeline import run_classification
from invasive_ai_calendar.classifier.service import ClassifierConfig, ClassifierService
from invasive_ai_calendar.collector.providers import MacOSActiveWindowProvider, MockActiveWindowProvider
from invasive_ai_calendar.collector.service import CollectorConfig, CollectorService
from invasive_ai_calendar.config import get_settings
from invasive_ai_calendar.processor.pipeline import run_sessionization
from invasive_ai_calendar.reports import daily_summary

app = typer.Typer(help="Invasive AI Calendar CLI")


@app.command("init-db")
def init_db_cmd() -> None:
    settings = get_settings()
    db.init_db(settings.db_path)
    typer.echo(f"Initialized db at {settings.db_path}")


@app.command("collect-once")
def collect_once_cmd(mock: bool = typer.Option(False, "--mock")) -> None:
    settings = get_settings()
    provider = MockActiveWindowProvider() if mock else MacOSActiveWindowProvider()
    service = CollectorService(
        provider=provider,
        config=CollectorConfig(
            poll_seconds=settings.poll_seconds,
            dedupe_window_seconds=settings.dedupe_window_seconds,
        ),
    )

    db.init_db(settings.db_path)
    event = service.collect_once()
    if not event:
        typer.echo("No event emitted (deduped)")
        return

    with db.connect(settings.db_path) as conn:
        db.insert_raw_event(conn, event)
    typer.echo(f"Stored event {event.id} | {event.app} | {event.window_title}")


@app.command("collect-run")
def collect_run_cmd(mock: bool = typer.Option(False, "--mock")) -> None:
    settings = get_settings()
    provider = MockActiveWindowProvider() if mock else MacOSActiveWindowProvider()
    service = CollectorService(
        provider=provider,
        config=CollectorConfig(
            poll_seconds=settings.poll_seconds,
            dedupe_window_seconds=settings.dedupe_window_seconds,
        ),
    )

    db.init_db(settings.db_path)

    def emit(event):
        with db.connect(settings.db_path) as conn:
            db.insert_raw_event(conn, event)
        typer.echo(f"Stored event {event.id} | {event.app} | {event.window_title}")

    service.run_forever(emit)


@app.command("process-day")
def process_day_cmd(day: str = typer.Option(datetime.now(timezone.utc).date().isoformat(), "--day")) -> None:
    settings = get_settings()
    count = run_sessionization(settings.db_path, datetime.fromisoformat(day))
    typer.echo(f"Processed {count} sessions")


@app.command("classify-day")
def classify_day_cmd(day: str = typer.Option(datetime.now(timezone.utc).date().isoformat(), "--day")) -> None:
    settings = get_settings()
    service = ClassifierService(
        config=ClassifierConfig(
            model_version=settings.model_version,
            prompt_version=settings.prompt_version,
        )
    )
    count = run_classification(settings.db_path, datetime.fromisoformat(day), service)
    typer.echo(f"Classified {count} sessions")


@app.command("calendar-day")
def calendar_day_cmd(day: str = typer.Option(datetime.now(timezone.utc).date().isoformat(), "--day")) -> None:
    settings = get_settings()
    count = run_calendar_build(settings.db_path, datetime.fromisoformat(day))
    typer.echo(f"Built {count} calendar blocks")


@app.command("report-day")
def report_day_cmd(day: str = typer.Option(datetime.now(timezone.utc).date().isoformat(), "--day")) -> None:
    settings = get_settings()
    typer.echo(daily_summary(settings.db_path, datetime.fromisoformat(day)))


if __name__ == "__main__":
    app()
