# MongoDB

A NoSQL Database which stores `Documents` in `Collections` (instead of `Records` in `Tables` as in SQL).

Store application Data

Enforce no Schema or Relations

Easily connected to Node / Express (NOT to React)

## NoSQL vs. SQL

### NoSQL

- MongoDB, CouchDB
- Enforces no Data Schema
- Less focus on relations
- "Independent documents"
- Great for logs, orders chat messages

### SQL

- MySQL, MS SQL
- Enforces a Strict Data Schema
- Relations are a Core Feature
- Records are related
- Great for shopping carts, contacts, networks

DO NOT connect React to database directly!! Highly insecure.

- Secure authentication is not really possible.
- Full database would be exposed.

### Setup Docker and local MongoDB

1. Download [docker](docker.com) and install it.
2. Pull MongoDB docker image file with:

```shell
$ docker pull mongo
```

It will automatically pull the latest mongo image.

3. Create a runnable container for MongoDB with:

```shell
$ docker run -d --name <name-of-the-container> -e MONGO_INITDB_ROOT_USERNAME=<username> -e MONGO_INITDB_ROOT_PASSWORD=<password> -p <outside-port>:<inside-port> <name>
```

for example

```shell
$ docker run -d --name mern-mongo -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -p 27111:27017 mongo
```

Once this is done its enough to start the previously
created container with:

```shell
$ docker start <container-name>
```

and stop it with:

```shell
$ docker stop <container-name>
```
