################################################################################
"""
WordWall - Simple, Self-Hosted Collaborative Word Cloud Generator.

(c) 2024 | Stanley Solutions | Joe Stanley
License: MIT
"""
################################################################################

from fastapi import APIRouter

from . import words
from ..session import Manager

router = APIRouter(prefix="/api/v1")

router.include_router(router=words.router)

manager = Manager()

@router.get("/walls")
async def get_list_of_all_walls() -> list[dict[str, str]]:
    """Return a List of All Wall-IDs."""
    return [{"id": w.id, "hash": w.hash} for w in manager.all_walls()]
