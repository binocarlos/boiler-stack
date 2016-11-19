# boiler-stack

Starting place for apps.

You need `docker` and `docker-compose` (latest versions not the toolbox).

If you get errors with docker, run as `sudo`.

## install

build the images:

```
$ make build
```

## frontend

to build the frontend code:

```
$ make frontend.build
$ make frontend.release
$ make frontend.watch
```

## run stack

```
$ docker-compose up
```