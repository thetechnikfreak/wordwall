################################################################################
"""
WordWall - Simple, Self-Hosted Collaborative Word Cloud Generator.

(c) 2024 | Stanley Solutions | Joe Stanley
License: MIT
"""
################################################################################

from fastapi import APIRouter

from . import words

router = APIRouter(prefix="/api/v1")

router.include_router(router=words.router)
