FROM ubuntu:latest

RUN apt update && apt install python3 python3-pip -y -qq

COPY ./backend/requirements.txt /
RUN pip install -r requirements.txt --break-system-packages

RUN mkdir /app

COPY ./backend /app/backend
COPY ./frontend/ /app/frontend

WORKDIR /app/backend

ENTRYPOINT ["fastapi", "run", "api.py"]