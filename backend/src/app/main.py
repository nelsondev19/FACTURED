# TYPES
from contextlib import asynccontextmanager
from psycopg2 import OperationalError

# CLASS
from fastapi import FastAPI

# ROUTERS
from ..routers.boards import boards_router
from ..routers.tasks import tasks_router

# FUNCTIONS
from ..postgres.connection import connect_to_pg
from os import getenv

try:
    pg_connection = connect_to_pg(getenv("POSTGRES_URL"))
    print("CONNECTED TO DATABASE!")
except OperationalError as e:
    print(f"Failed to connect to PostgreSQL after multiple attempts: {e}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    # CLEANUP
    pg_connection.close()
    print("DISCONNECTED FROM DATABASE")


app = FastAPI(lifespan=lifespan)


@app.get("/")
def health():
    return "OK"


app.include_router(boards_router, prefix="/boards")
app.include_router(tasks_router, prefix="/tasks")
