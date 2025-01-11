## TYPES
from ..postgres.connection import pg_connection, pg_cursor
from ..app.models import Board


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

    def read(self):
        try:
            pg_cursor.execute("SELECT * FROM public.boards;")

            result = []

            boards = list(pg_cursor.fetchall())

            for board in boards:
                result.append(
                    {
                        "id": board[0],
                        "name": board[1],
                        "description": board[2],
                        "created_at": board[3],
                    }
                )
            return result
        except Exception as e:
            print(e)
            return {"error": e}

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
