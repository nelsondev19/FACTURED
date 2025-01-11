# TYPES
from typing import Optional
from pydantic import BaseModel

# FUNCTIONS
from datetime import datetime


class Board(BaseModel):
    id: int
    name: str
    description: str
    created_at: Optional[datetime] = None


class Task(BaseModel):
    id: int
    name: str
    description: str
    status: str = "Pending"
    created_at: Optional[datetime] = None
    board_id: int
