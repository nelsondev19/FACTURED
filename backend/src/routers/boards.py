from fastapi import APIRouter
from ..app.models import Board
from ..repository.board import BoardRepository

boards_router = APIRouter()


@boards_router.get("/all")
def get_all_boards():
    return BoardRepository().read()


@boards_router.post("/create")
def create_board(board: Board):
    return BoardRepository().create(board=board)


@boards_router.patch("/update")
def update_board(board: Board):
    return BoardRepository().update(board=board)


@boards_router.delete("/delete/{id}")
def delete_board(id: int):
    return BoardRepository().delete(id=id)
