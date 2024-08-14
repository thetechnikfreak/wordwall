################################################################################
"""
WordWall - Simple, Self-Hosted Collaborative Word Cloud Generator.

(c) 2024 | Stanley Solutions | Joe Stanley
License: MIT
"""
################################################################################

from typing import Awaitable

from fastapi import APIRouter, HTTPException, status

from ..database import WordResponse
from ..session import Manager

router = APIRouter(prefix="/words")

manager = Manager()

async def active_wall(func: Awaitable, wall_hash: str):
    """Handler for the Wall's Activity."""
    if (wall := manager.get_by_hash(wall_hash=wall_hash)):
        if wall.active:
            await func()
        else:
            raise HTTPException(
                status_code=status.HTTP_410_GONE,
                detail="That WordWall is not presently active."
            )
        return await get_words_for_wall(wall_id=wall.hash)
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="That WordWall could not be found."
    )

@router.get("/{wall_id}")
async def get_words_for_wall(wall_id: str) -> list[dict[str, int]]:
    """Get all of the Words for a Particular Wall."""
    if manager.get_by_id(wall_id=wall_id):
        word_records = await WordResponse.filter(wall_id=wall_id)
        words = {}
        for record in word_records:
            if record.word not in words:
                words[record.word] = 1 # Record Word
            else:
                words[record.word] += 1 # Increment
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="That WordWall could not be found."
    )

@router.put("/")
async def add_word_to_wall(word: WordResponse) -> list[dict[str, int]]:
    """Add a new Word to a Specified Wall."""
    return await active_wall(func=word.create, wall_hash=word.wall_hash)

@router.post("/")
async def update_word_on_wall(word: WordResponse) -> list[dict[str, int]]:
    """Update an Existing Word on a Specified Wall."""
    return await active_wall(func=word.update, wall_hash=word.wall_hash)

@router.delete("/")
async def remove_word_from_wall(word: WordResponse) -> list[dict[str, int]]:
    """Remove an Existing Word from a Wall."""
    return await active_wall(func=word.delete, wall_hash=word.wall_hash)
