from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone


@dataclass
class ActiveWindowSnapshot:
    ts: datetime
    app: str
    window_title: str
    bundle_id: str
    is_idle: bool


class ActiveWindowProvider:
    def capture(self) -> ActiveWindowSnapshot:
        raise NotImplementedError


class MockActiveWindowProvider(ActiveWindowProvider):
    def __init__(self) -> None:
        self._flip = False

    def capture(self) -> ActiveWindowSnapshot:
        self._flip = not self._flip
        if self._flip:
            return ActiveWindowSnapshot(
                ts=datetime.now(timezone.utc),
                app="Visual Studio Code",
                window_title="main.py",
                bundle_id="com.microsoft.VSCode",
                is_idle=False,
            )
        return ActiveWindowSnapshot(
            ts=datetime.now(timezone.utc),
            app="Google Chrome",
            window_title="Docs",
            bundle_id="com.google.Chrome",
            is_idle=False,
        )


class MacOSActiveWindowProvider(ActiveWindowProvider):
    """Best-effort provider using AppleScript to avoid hard dependency on PyObjC.

    This is intentionally small for v1; replace with Quartz/AppKit observer in later milestones.
    """

    def capture(self) -> ActiveWindowSnapshot:
        import subprocess

        script = (
            'tell application "System Events"\n'
            'set frontApp to name of first application process whose frontmost is true\n'
            'set frontTitle to ""\n'
            'tell process frontApp\n'
            'if (count of windows) > 0 then set frontTitle to name of front window\n'
            'end tell\n'
            'return frontApp & "||" & frontTitle\n'
            'end tell'
        )
        result = subprocess.run(
            ["osascript", "-e", script],
            check=False,
            capture_output=True,
            text=True,
        )
        value = result.stdout.strip() if result.returncode == 0 else "Unknown||"
        app, _, title = value.partition("||")
        app = app or "Unknown"
        title = title or ""

        return ActiveWindowSnapshot(
            ts=datetime.now(timezone.utc),
            app=app,
            window_title=title,
            bundle_id=f"unknown.{app.lower().replace(' ', '.')}",
            is_idle=False,
        )
