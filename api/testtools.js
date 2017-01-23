"use strict";
const EventEmitter2 = require('eventemitter2').EventEmitter2
const Connection = require('./src/database/connection')
const objhash = require('object-hash')

const queryHash = (sql, params) => {
  return objhash({
    sql,
    params
  })
}

// event bus that keeps a hash log of events
// and can compare against an expected log
// useful for unit testing the models
// (which emit events for on the commandBus)
const EventBus = () => {
  let state = {
    count: 0,
    events: {
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
  const bus = new EventEmitter2({
    wilcard: true
  })
  bus.on('*', function(message) {
    const event = this.event
    console.log('-------------------------------------------');
    console.log('-------------------------------------------');
    console.dir(event)
  })
  return bus
}

// mock postgres that logs the queries
// and uses a hash to record results / compare
const Postgres = (opts) => {
  opts = opts || {}
  let state = {
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

  const processParams = (params) => {
    return opts.noParams ? [] : params
  }

  const processQuery = (sql, params) => {
    sql = (sql || '').replace(/\n/g, ' ')
    sql = (sql || '').replace(/\s*$/, '')
    sql = (sql || '').replace(/"/g, '')
    params = processParams(params || [])
    return {
      sql,
      params
    }
  }

  const addQuery = (section, q, results) => {
    const query = processQuery(q.sql, q.params)
    const hash = queryHash(query)
    state.queries[section].db[hash] = {
      query,
      results
    }
    state.queries[section].list.push(hash)
  }
  const addExpectedQuery = (q, results) => addQuery('expected', q, results)
  const addActualQuery = (q, results) => addQuery('actual', q, results)
  const setFinished = () => state.finished = true

  /*
  
    shims
    
  */
  const client = {
    query: (sql, params, done) => {
      const query = processQuery(sql, params)
      const hash = queryHash(query)
      const expected = state.queries.expected.db[hash]
      const results = expected ?
        expected.results :
        []
      addActualQuery(query, results)
      // simulate async
      setTimeout(() => done(null, {
        rows: results
      }), 10)
    }
  }

  const check = (t, msg) => {
    const queries = state.queries
    t.deepEqual(queries.expected, queries.actual, msg || 'the query logs are the same')
  }

  return {
    connect: (cb) => cb(null, client, setFinished),
    expect: addExpectedQuery,
    getState: () => state,
    check: check
  }
}

const connection = (postgres) => Connection(postgres)

module.exports = {
  postgres: Postgres,
  eventBus: EventBus,
  connection
}