const tape = require('tape')
const tools = require('../../../testtools')
const Crud = require('../../../src/database/crud')

tape('crud', (t) => {

  // this could be loaded from a fixture file as JSON
  const apples = {
    sql: 'select * from fruit where',
    params: [],
    results: [{
      id: 10,
      name: 'red'
    }]
  }

  const postgres = tools.postgres()
  const connection = tools.connection(postgres)
  const fruit = Crud(connection, 'fruit')

  t.end()
})