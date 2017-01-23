const tape = require('tape')
const tools = require('../../../testtools')

tape('connection', (t) => {

  // this could be loaded from a fixture file as JSON
  const apples = {
    sql: 'select * from apples',
    params: [],
    results: [{
      id: 10,
      name: 'red'
    }]
  }

  const db = tools.connection({

    // the function to provide results for expected queries
    // at present - it is not used to validate only provide some results to work with
    // you can use db.getState and check `queries.actual` to see what queries were issued
    setup: (expect) => {
      expect(apples)
    },

    // test fn
    run: (client, finish) => {
      client.query(apples.sql, apples.params, finish)
    },

    // results checker
    check: (err, results) => {
      if(err) t.error(err)
      t.deepEqual(results, apples.results, 'the results are equal')
      t.end()
    }

  })  
})