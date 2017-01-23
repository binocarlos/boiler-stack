"use strict";
const tape = require('tape')
const tools = require('../../../testtools')


// this could be loaded from a fixture file as JSON
const BASE_QUERY = {
  query: {
    sql: 'select * from apples',
    params: []
  },
  results: [{
    id: 10,
    name: 'red'
  }]
}

const testBaseQuery = (name, sql) => {
  sql = sql || BASE_QUERY.query.sql
  tape(name, (t) => {
    const postgres = tools.postgres()
    const connection = tools.connection(postgres)
    postgres.expect(BASE_QUERY.query, BASE_QUERY.results)
    connection((client, next) => {
      client.query(sql, BASE_QUERY.query.params, next)
    }, (err, results) => {
      if(err) t.error(err)
      t.deepEqual(results.rows, BASE_QUERY.results, 'the results are equal')
      postgres.check(t)
      t.end()
    })
  })   
}

testBaseQuery('basic connection')
testBaseQuery('strip newlines', `select *
from apples`)
testBaseQuery('strip spaces', `select * from apples `)
testBaseQuery('strip double quotes', `select * from "apples"`)

const testNoPar = (name, sql) => {
  sql = sql || BASE_QUERY.query.sql
  tape(name, (t) => {
    const postgres = tools.postgres()
    const connection = tools.connection(postgres)
    postgres.expect(BASE_QUERY.query, BASE_QUERY.results)
    connection((client, next) => {
      client.query(sql, BASE_QUERY.query.params, next)
    }, (err, results) => {
      if(err) t.error(err)
      t.deepEqual(results.rows, BASE_QUERY.results, 'the results are equal')
      postgres.check(t)
      t.end()
    })
  })   
}

tape('test with no params', (t) => {
  const postgres = tools.postgres({
    noParams: true
  })
  const connection = tools.connection(postgres)
  postgres.expect({
    // no params for query - sometimes we wont know the params
    sql: BASE_QUERY.query.sql
  }, BASE_QUERY.results)

  connection((client, next) => {
    // give the params to the actual query like we would be
    client.query(BASE_QUERY.query.sql, BASE_QUERY.query.params, next)
  }, (err, results) => {
    if(err) t.error(err)

    // everything should be the same
    console.log(JSON.stringify(postgres.getState(), null, 4))
    t.deepEqual(results.rows, BASE_QUERY.results, 'the results are equal')
    postgres.check(t)
    t.end()
  })
})