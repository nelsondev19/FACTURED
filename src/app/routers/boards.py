from fastapi import APIRouter


boards_router = APIRouter()


@boards_router.get("/create")
def board_create():
    return "Created!"
