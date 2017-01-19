const tape = require('tape')
const SQL = require('../../src/sql')

const queryMock = (query, done) => done(null, query)
const getSQL = (table) => SQL(queryMock, table)

tape('select', (t) => {
  const sql = getSQL('apples')

  sql.select({
    color:'red'
  }, (err, query) => {
    console.log('-------------------------------------------');
    console.dir(query)
    t.end()
  })
})