"use strict";
const tape = require('tape')
const tools = require('../../../testtools')
const Crud = require('../../../src/database/crud')

const getCrud = (postgres) => {
  postgres = postgres || tools.postgres()
  const connection = tools.connection(postgres)
  return Crud(connection, 'fruit')
}

tape('sanity', (t) => {
  const crud = getCrud()
  crud.select({
    color: 'red'
  }, (err, results) => {
    t.deepEqual(results, [], 'empty array')
    t.end()
  })
})

tape('select', (t) => {
  const query = {
    sql: 'select * from fruit where color = $1',
    params: ['red']
  }
  const results = [{
    name: 'apples'
  }]
  const postgres = tools.postgres()
  const crud = getCrud(postgres)

  postgres.expect(query, results)
  
  crud.select({
    color: 'red'
  }, (err, results) => {
    postgres.check(t, 'select query is correct')
    t.end()
  })
})