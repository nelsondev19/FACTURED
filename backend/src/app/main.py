# TYPES
from contextlib import asynccontextmanager

# CLASS
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ROUTERS
from ..routers.boards import boards_router
from ..routers.tasks import tasks_router

# FUNCTIONS
from ..postgres.connection import pg_connection


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    # CLEANUP
    pg_connection.close()
    print("DISCONNECTED FROM DATABASE")


app = FastAPI(lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health():
    return "OK"


app.include_router(boards_router, prefix="/boards")
app.include_router(tasks_router, prefix="/tasks")
