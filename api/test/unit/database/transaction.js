"use strict";
const tape = require('tape')
const tools = require('../../../testtools')
const Transaction = require('../../../src/database/transaction')
const SQL = require('../../../src/database/sql')
const async = require('async')

tape('transaction', (t) => {
  const postgres = tools.postgres()
  const connection = tools.connection(postgres)
  const transaction = Transaction(connection)

  postgres.expect({sql: 'BEGIN'})
  postgres.expect({sql: "insert into fruit ( name ) values ( $1 ) returning *", params: ['apples']})
  postgres.expect({sql: "insert into fruit ( name ) values ( $1 ) returning *", params: ['oranges']})
  postgres.expect({sql: "COMMIT"})

  const apples = SQL.insert('fruit', {name:'apples'})
  const oranges = SQL.insert('fruit', {name:'oranges'})
  transaction((query, done) => {
    async.series([
      (next) => query(apples.sql, apples.params, next),
      (next) => query(oranges.sql, oranges.params, next),
    ], done)
  }, (err, results) => {
    postgres.check(t, 'the transaction query log is correct')
    t.end()
  })
})