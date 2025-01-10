## TYPES
import psycopg2
from psycopg2 import OperationalError
from psycopg2._psycopg import connection, cursor

## FUNCTIONS
import time
from os import getenv
from .create_tables import create_tables


pg_connection: connection = None
pg_cursor: cursor = None


def connect_to_pg(db_url: str, max_retries=3, delay=5):
    global pg_cursor, pg_connection
    retries = 0
    while retries < max_retries:
        try:
            pg_connection = psycopg2.connect(db_url, connect_timeout=10)

            print("CONNECTED TO DATABASE!")

            pg_cursor = pg_connection.cursor()

            create_tables(pg_connection, pg_cursor)

            return pg_connection
        except OperationalError as e:
            retries += 1
            print(f"Connection attempt {retries} failed: {e}")
            if retries >= max_retries:
                raise
            time.sleep(delay)


connect_to_pg(getenv("POSTGRES_URL"))
