const tape = require('tape')
const SQL = require('../../../src/database/sql')

tape('sql - where', (t) => {

  const query = SQL.where({
    a: 'hello',
    b: 'apples'
  })

  t.deepEqual(query, {
    sql:[
      '"a" = $1',
      'and',
      '"b" = $2'
    ].join("\n"),
    params: ['hello', 'apples']
  }, 'the query is correct')

  t.end()
})