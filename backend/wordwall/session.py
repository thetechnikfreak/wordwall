################################################################################
"""
WordWall - Simple, Self-Hosted Collaborative Word Cloud Generator.

(c) 2024 | Stanley Solutions | Joe Stanley
License: MIT
"""
################################################################################

from uuid import uuid4

#pylint: disable=too-few-public-methods
class Wall:
    """Structure to Represent a Wall."""

    wall_id: str
    def __init__(self):
        """Set Up New Wall Record."""
        self.wall_id = str(uuid4())
        self._active = True

    @property
    def active(self) -> bool:
        """Indication whether the Wall is Active for New Words."""
        return self._active

    @active.setter
    def active(self, new: bool) -> None:
        """Set the State of the Active/Inactive Flag."""
        self._active = new

    @property
    def wall_hash(self) -> str:
        """Return the 4-Character Hash of the Wall ID."""
        return str(hash(self.wall_id))[-4:]
#pylint: enable=too-few-public-methods

ALL_WALLS: list[Wall] = []

class Manager:
    """Tracking Engine to Record all Active Word Walls."""

    _walls: list[Wall] = ALL_WALLS

    def __init__(self):
        """Constructor."""
        self._walls = []

    def new_wall(self) -> Wall:
        """Record a New Wall."""
        new_wall = Wall()
        self._walls.append(new_wall)
        return new_wall

    def get_by_id(self, wall_id: str) -> Wall:
        """Locate the Wall by its ID."""
        for wall in self._walls:
            if wall.wall_id == wall_id:
                return wall
        return None

    def get_by_hash(self, wall_hash: str) -> Wall:
        """Locate the Wall by its ID."""
        for wall in self._walls:
            if wall.wall_hash == wall_hash:
                return wall
        return None
