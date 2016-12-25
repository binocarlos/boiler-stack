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

To tail logs for the frontend build in another window:

```bash
$ make frontend.logs
```

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

Once you have built the frontend - you can run the production trim (where the frontend assets are statically served):

```bash
$ make compose.up.prod
```

#### run tests

To run the frontend (unit) tests:

```bash
$ make frontend.test.unit
```
