from fastapi import APIRouter
from ..app.models import Task
from ..repository.tasks import TaskRepository

tasks_router = APIRouter()


@tasks_router.get("/")
def get_all_tasks():
    return TaskRepository().read()


@tasks_router.post("/create")
def create_task(task: Task):
    return TaskRepository().create(task=task)


@tasks_router.patch("/update")
def update_task(task: Task):
    return TaskRepository().update(task=task)


@tasks_router.delete("/delete/{id}")
def delete_task(id: int):
    return TaskRepository().delete(id=id)
