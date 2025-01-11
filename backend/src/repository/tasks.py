## TYPES
from ..postgres.connection import pg_connection, pg_cursor
from ..app.models import Task


class TaskRepository:
    def create(self, task: Task):
        try:
            pg_cursor.execute(
                "INSERT INTO public.tasks (name, description, status, board_id, created_at) VALUES (%s, %s, %s, %s, %s);",
                (
                    task.name,
                    task.description,
                    task.status,
                    task.board_id,
                    task.created_at,
                ),
            )

            pg_connection.commit()

            return {"message": "success"}
        except Exception as e:
            print(e.message)
            return {"error": e}

    def read_by_board_id(self, board_id: int):
        try:
            pg_cursor.execute(
                "SELECT * FROM public.tasks WHERE board_id = %s;", (board_id,)
            )

            result = []

            tasks = list(pg_cursor.fetchall())

            for task in tasks:
                result.append(
                    {
                        "id": task[0],
                        "name": task[1],
                        "description": task[2],
                        "status": task[3],
                        "created_at": task[4],
                        "board_id": task[5],
                    }
                )
            return result
        except Exception as e:
            print(e)
            return {"error": e}

    def update(self, task: Task):
        try:
            pg_cursor.execute(
                "UPDATE public.tasks SET name = %s, description = %s, status = %s, board_id = %s, created_at = %s WHERE id = %s;",
                (
                    task.name,
                    task.description,
                    task.status,
                    task.board_id,
                    task.created_at,
                    task.id,
                ),
            )

            pg_connection.commit()

            return {"message": "success"}
        except Exception as e:
            return {"error": e}

    def delete(self, id: int):
        try:
            pg_cursor.execute("DELETE FROM public.tasks WHERE id = %s;", (id,))

            pg_connection.commit()

            return {"message": "success"}
        except Exception as e:
            print(e.message)
            return {"error": e}
