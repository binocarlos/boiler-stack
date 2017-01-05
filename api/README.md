# boiler-stack

## database interface

To implement a database and plug-n-play into the query/commands:

```
const load = (table, params, done)
const insert = (table, data, done)
const update = (table, data, params, done)
const del = (table, params, done)
const raw = (name, params, done) 
```
