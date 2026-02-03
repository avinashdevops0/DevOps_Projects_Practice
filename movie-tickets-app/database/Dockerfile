FROM mysql:8

ENV MYSQL_ROOT_PASSWORD=rootpassword

COPY ./movies_db.sql /docker-entrypoint-initdb.d/movies_db.sql
