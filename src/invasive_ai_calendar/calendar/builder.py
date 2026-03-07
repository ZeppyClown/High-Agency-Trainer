from __future__ import annotations

from invasive_ai_calendar.models import BlockStatus, CalendarBlock, CategoryPrediction, Session


def build_blocks(
    sessions: list[Session], predictions: dict[str, CategoryPrediction], merge_gap_seconds: int = 300
) -> list[CalendarBlock]:
    blocks: list[CalendarBlock] = []

    for session in sorted(sessions, key=lambda s: s.start):
        prediction = predictions.get(session.session_id)
        category = prediction.label if prediction else "uncategorized"
        status = BlockStatus.SUGGESTED

        block = CalendarBlock(
            start=session.start,
            end=session.end,
            category=category,
            source_session_ids=[session.session_id],
            status=status,
        )

        if not blocks:
            blocks.append(block)
            continue

        prev = blocks[-1]
        gap = (block.start - prev.end).total_seconds()
        if prev.category == block.category and gap <= merge_gap_seconds and prev.status == block.status:
            prev.end = block.end
            prev.source_session_ids.extend(block.source_session_ids)
        else:
            blocks.append(block)

    return blocks
