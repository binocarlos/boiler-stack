const tape = require('tape')
const SQL = require('../../../src/database/sql')

const BASE_WHERE = {
  a: 'hello',
  b: 'apples'
}

const BASE_SQL = [
  '"a" = $1',
  'and',
  '"b" = $2'
].join("\n")

const BASE_PARAMS = Object.keys(BASE_WHERE).map(k => BASE_WHERE[k])

tape('sql - where', (t) => {
  const query = SQL.where(BASE_WHERE)
  t.deepEqual(query, {
    sql:BASE_SQL,
    params: BASE_PARAMS
  }, 'the query is correct')

  t.end()
})
