FROM python:3.13.0-alpine3.19

WORKDIR /app

COPY ./requirements.txt ./

RUN pip install -r requirements.txt

ENV POSTGRES_URL=""

COPY . /app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]