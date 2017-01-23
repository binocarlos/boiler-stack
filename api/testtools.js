const Connection = require('./src/database/connection')
const objhash = require('object-hash')

const queryHash = (sql, params) => {
  return objhash({
    sql,
    params
  })
}

const Postgres = () => {
  const state = {
    finished: false,
    queries: {
      expected: {
        db: {},
        list: []
      },
      actual: {
        db: {},
        list: []
      }
    }
  }

  const addQuery = (section, q) => {
    const query = { sql: q.sql, params: q.params }
    const hash = queryHash(query)
    state.queries[section].db[hash] = q
    state.queries[section].list.push(hash)
  }
  const addExpectedQuery = (q) => addQuery('expected', q)
  const addActualQuery = (q) => addQuery('actual', q)
  const setFinished = () => state.finished = true

  /*
  
    shims
    
  */
  const client = {
    query: (sql, params, done) => {
      const query = { sql, params }
      const hash = queryHash(query)
      const expected = state.queries.expected.db[hash]
      const results = expected ?
        expected.results :
        []
      addActualQuery(Object.assign({}, query, {
        results
      }))
      // simulate async
      setTimeout(() => done(null, results), 10)
    }
  }

  return {
    connect: (cb) => cb(null, client, setFinished),
    expect: addExpectedQuery,
    getState: () => state
  }
}

const defaultRun = (c, f) => {
  f(null, [])
}
const defaultSetup = () => {}
const defaultCheck = () => {}

const getConnection = (opts) => {
  opts = opts || {}
  const setup = opts.setup || defaultSetup
  const run = opts.run || defaultRun
  const check = opts.check || defaultCheck
  const postgres = Postgres()
  setup(postgres.expect)
  const connection = Connection(postgres)
  connection(run, check)
  return postgres
}

module.exports = {
  postgres: Postgres,
  connection: getConnection
}