import time
import psycopg2
from psycopg2 import OperationalError


def connect_to_pg(db_url: str, max_retries=3, delay=5):
    retries = 0
    while retries < max_retries:
        try:
            pg_connection = psycopg2.connect(db_url, connect_timeout=10)

            return pg_connection.cursor()
        except OperationalError as e:
            retries += 1
            print(f"Connection attempt {retries} failed: {e}")
            if retries >= max_retries:
                raise
            time.sleep(delay)
