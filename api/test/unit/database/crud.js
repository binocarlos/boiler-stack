"use strict";
const tape = require('tape')
const tools = require('../../../testtools')
const Crud = require('../../../src/database/crud')

const getCrud = (setup) => {
  const postgres = tools.postgres()
  setup && setup(postgres)
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
  let p = null
  const crud = getCrud(pg => {
    p = pg
    pg.expect(query, results)
  })
  crud.select({
    color: 'red'
  }, (err, results) => {
    console.dir(results)
    console.log(JSON.stringify(p.getState(), null, 4))
    t.end()
  })
})