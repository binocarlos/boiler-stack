"use strict";

const Logger = require('../logger')
const logger = Logger('postgres:client')
const async = require('async')

const processQuery = (q) => {
  if(typeof(q) == 'string') {
    q = {
      sql: q,
      params: []
    }
  }
  return q
}

// wrap the pg.query with a single object with {sql,params}
const QueryFactory = (runner) => (q, done) => {
  q = processQuery(q)
  runner(q.sql, q.params, (err, results) => {
    if(err) {
      logger.error('query', q.id, {
        error: err.toString(),
        query: q
      })
    }
    else {
      logger.debug('query', q.id, {
        query: q,
        results: (results || {}).rows
      })
    }
    done(err, results)
  })
}

// returns an api with:
//  * query({sql,params}, done)        - one off query, client returned automatically    
//  * transaction(handler, done)       - connection wrapped in BEGIN/COMMIT/ROLLBACK
// 
// handler(query, done)                - query is same ({sql,params},done)
const Client = (postgres) => {

  // the auto-pool closing query function
  const postgresQuery = postgres.query.bind(postgres)

  // get a client that we close ourselves - used for transactions
  const postgresConnect = postgres.connect.bind(postgres)

  // run queries on the pool directly
  const query = QueryFactory(postgresQuery)

  const tracer = (id, runQuery) => (q, done) => {
    runQuery = runQuery || query
    q = processQuery(q)
    q.id = id
    runQuery(q, done)
  }

  // run a transaction with a query object
  const transaction = (tracerid, handler, done) => {
    postgres.connect((err, client, release) => {
      if(err) {
        release()
        return done(err)
      }
      const runQuery = tracer(tracerid, QueryFactory(client.query.bind(client)))
      async.series({
        begin:   (next) => runQuery('BEGIN', next),
        command: (next) => handler(runQuery, next),
        commit:  (next) => runQuery('COMMIT', next)
      }, (err, results) => {
        if(err) {
          runQuery('ROLLBACK', () => {
            release()
            done(err)
          })
        }
        else{
          release()
          done(null, results.command)
        }
      })
    })
  }

  return {
    query,
    tracer,
    transaction
  }
}

module.exports = Client