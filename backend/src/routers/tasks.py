from fastapi import APIRouter
from ..app.models import Task
from ..repository.tasks import TaskRepository

tasks_router = APIRouter()


@tasks_router.get("/board/{id}")
def get_tasks_by_board_id(id: int):
    return TaskRepository().read_by_board_id(board_id=id)


@tasks_router.post("/create")
def create_task(task: Task):
    return TaskRepository().create(task=task)


@tasks_router.put("/update")
def update_task(task: Task):
    return TaskRepository().update(task=task)


@tasks_router.delete("/delete/{id}")
def delete_task(id: int):
    return TaskRepository().delete(id=id)
