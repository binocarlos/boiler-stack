# boiler-stack / frontend

Run all boiler-ui tests:

```bash
$ yarn run test:boiler
```

Run one boiler-ui test:

```bash
$ yarn run test:boiler -- -d unit.actions
```

Run multiple boiler-ui tests:

```bash
$ yarn run test:boiler -- -d unit.actions -d unit.reducers
```

Run pretty boiler-ui tests:

```bash
$ yarn run test:boiler:pretty
```

Run specific pretty boiler-ui tests:

```bash
$ yarn run test:boiler -- -d unit.actions | yarn run test:pretty
```