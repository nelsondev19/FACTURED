## TYPES
from ..postgres.connection import pg_connection, pg_cursor
from ..app.models import Task


class TaskRepository:
    def create(self, task: Task):
        try:
            pg_cursor.execute(
                "INSERT INTO public.tasks (name, description, status, created_at, updated_at, board_id) VALUES (%s, %s, %s, %s, %s, %s);",
                (
                    task.name,
                    task.description,
                    task.status,
                    task.created_at,
                    task.updated_at,
                    task.board_id,
                ),
            )

            pg_connection.commit()

            return {"message": "success"}
        except Exception as e:
            pg_connection.rollback()
            print(e)
            return {"error": e}

    def update(self, task: Task):
        try:
            pg_cursor.execute(
                "UPDATE public.tasks SET name = %s, description = %s, status = %s, board_id = %s, updated_at = %s WHERE id = %s;",
                (
                    task.name,
                    task.description,
                    task.status,
                    task.board_id,
                    task.updated_at,
                    task.id,
                ),
            )

            pg_connection.commit()

            return {"message": "success"}
        except Exception as e:
            pg_connection.rollback()
            print(e)
            return {"error": e}

    def delete(self, id: int):
        try:
            pg_cursor.execute("DELETE FROM public.tasks WHERE id = %s;", (id,))

            pg_connection.commit()

            return {"message": "success"}
        except Exception as e:
            pg_connection.rollback()
            print(e)
            return {"error": e}

    def read(self, prev_id: int = 0):
        try:
            limit = 50
            query = f"""
SELECT
  id, name, description, status, created_at, updated_at, board_id
FROM
  public.tasks
WHERE
  id < {prev_id}
ORDER BY
  tasks.id DESC
LIMIT
  {limit}
            """
            pg_cursor.execute(query=query)

            data = pg_cursor.fetchall()

            result = []

            for item in data:
                result.append(
                    {
                        "id": item[0],
                        "name": item[1],
                        "description": item[2],
                        "status": item[3],
                        "created_at": item[4],
                        "updated_at": item[5],
                        "board_id": item[6],
                    }
                )
            return result
        except Exception as e:
            pg_connection.rollback()
            print(e)
            return []
