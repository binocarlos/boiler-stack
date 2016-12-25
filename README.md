# boiler-stack

## build images

```bash
$ make compose.build
```

If you want to re-trigger the pull/build from scratch:

```bash
$ make compose.rebuild
```

## start stack

To start the development stack:

```bash
$ make compose.up.dev
```

The frontend code is being served in development trim - this means hot module reloading and logging turned on.  The `frontend/src` folder is mounted so you can change files on your host and the frontend will rebuild.

## build frontend code

To build the production frontend artifacts (outputs to `frontend/dist`):

```bash
$ make frontend.release
```

To analyze which modules are taking up size in the build 
(note these sizes are pre-uglify - use the ratios not the numbers)

```bash
$ make frontend.analyze
```

#### run tests

To run the frontend (unit) tests:

```bash
$ make frontend.test
```
