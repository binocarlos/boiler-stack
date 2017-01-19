const tape = require('tape')
const SQL = require('../../src/sql')

const queryMock = (query, done) => done(null, query)
const getSQL = (table) => SQL(queryMock, table)

tape('select', (t) => {
  const sql = getSQL('apples')

  sql.select({
    color:'red'
  }, (err, query) => {

    if(err) {
      t.error(err)
    }
    else {
      t.deepEqual(query, {
        sql: `select * from "apples"
where
  "color" = $1
`,
        params: ['red']
      })
    }

    t.end()
  })
})