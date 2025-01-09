from fastapi import APIRouter


tasks_router = APIRouter()


@tasks_router.get("/create")
def tasks_create():
    return "Created!"
