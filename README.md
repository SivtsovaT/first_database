# First Demo Express

## Run database in docker

```bash
docker run --name first-pg -e POSTGRES_USER=user1 -e POSTGRES_PASSWORD=pass1 -e POSTGRES_DB=first-db -e PGDATA=/var/lib/postgresql/data/pgdata -v dbdata:/var/lib/postgresql/data -p 5432:5432 postgres:13-alpine3.14
```

## Start database

```shell
docker-compose up
```

## Create or update database

```shell
./node_modules/db-migrate/bin/db-migrate up
```

## Rollback to previous database

```shell
./node_modules/db-migrate/bin/db-migrate down
```

## Clean all services including database
```shell
docker-compose down --volumes
```