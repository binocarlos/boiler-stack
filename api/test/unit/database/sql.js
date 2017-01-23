const tape = require('tape')
const SQL = require('../../../src/database/sql')

const BASE_TABLE = 'fruit'

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
  }, 'the where clause is correct')

  t.end()
})

tape('sql - select', (t) => {
  const query = SQL.select(BASE_TABLE, BASE_WHERE)
  const CHECK_SELECT = [
    `select * from "${BASE_TABLE}"`,
    'where',
    BASE_SQL,
    ''
  ].join("\n")

  t.deepEqual(query, {
    sql: CHECK_SELECT,
    params: BASE_PARAMS
  }, 'the select query is correct')

  t.end()
})

tape('sql - insert', (t) => {
  const query = SQL.insert(BASE_TABLE, BASE_WHERE)
  const CHECK_INSERT = [
    `insert into "${BASE_TABLE}"`,
    '(','"a",','"b"',')','values','(','$1,','$2',')','returning *',''
  ].join("\n")
  t.deepEqual(query, {
    sql: CHECK_INSERT,
    params: BASE_PARAMS
  }, 'the insert query is correct')

  t.end()
})

