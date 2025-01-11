## TYPES
from ..postgres.connection import pg_connection, pg_cursor
from ..app.models import Board

# FUNCTIONS
from itertools import groupby


class BoardRepository:
    def create(self, board: Board):
        try:
            pg_cursor.execute(
                "INSERT INTO public.boards (name, description, created_at) VALUES (%s, %s, %s);",
                (board.name, board.description, board.created_at),
            )

            pg_connection.commit()

            return {"message": "success"}
        except Exception as e:
            print(e.message)
            return {"error": e}

    # GET BOARDS AND 50 MOST RECENTS TASKS
    def read(self):
        try:
            limit = 50
            query = f"""
WITH limited_tasks AS (
    SELECT 
        t.*, 
        ROW_NUMBER() OVER (PARTITION BY t.board_id ORDER BY t.created_at DESC) AS row_num
    FROM 
        tasks t
),
boards_with_tasks AS (
    SELECT
        b.*,
        json_agg(lt.* ORDER BY lt.created_at DESC) AS tasks
    FROM
        public.boards b
    LEFT JOIN (
        SELECT *
        FROM limited_tasks
        WHERE row_num <= {limit}
    ) lt ON lt.board_id = b.id
    GROUP BY
        b.id
)
SELECT *
FROM boards_with_tasks
ORDER BY created_at ASC;
            """
            pg_cursor.execute(query=query)

            data = pg_cursor.fetchall()

            result = []

            def key_func(item):
                return item[0]

            for _, group in groupby(data, key_func):
                for item in group:
                    tasks = item[4]
                    result.append(
                        {
                            "id": item[0],
                            "name": item[1],
                            "description": item[2],
                            "created_at": item[3],
                            "tasks": [] if tasks[0] is None else tasks,
                        }
                    )

            return result
        except Exception as e:
            print(e)
            return []

    def update(self, board: Board):
        try:
            pg_cursor.execute(
                "UPDATE public.boards SET name = %s, description = %s, created_at = %s WHERE id = %s;",
                (board.name, board.description, board.created_at, board.id),
            )

            pg_connection.commit()

            return {"message": "success"}
        except Exception as e:
            print(e.message)
            return {"error": e}

    def delete(self, id: int):
        try:
            pg_cursor.execute("DELETE FROM public.boards WHERE id = %s;", (id,))

            pg_connection.commit()

            return {"message": "success"}
        except Exception as e:
            print(e)
            return {"error": e}
