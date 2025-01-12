from psycopg2._psycopg import cursor, connection
from psycopg2 import DatabaseError


def create_tables(connection: connection, cursor: cursor):
    commands = (
        """
        CREATE TABLE boards (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE tasks (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            board_id INTEGER NOT NULL,
            FOREIGN KEY (board_id) REFERENCES boards (id) ON DELETE CASCADE
        )
        """,
    )
    try:
        for command in commands:
            cursor.execute(command)
        print("Tables created successfully")
    except DatabaseError as error:
        connection.rollback()
        print(error)
