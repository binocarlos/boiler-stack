"use strict";

const Logger = require('../logger')
const logger = Logger('postgres:client')

// wrap the pg.query with a single object with {sql,params}
const QueryFactory = (runner) => (q, done) => {
  if(typeof(q) == 'string') {
    q = {
      sql: q,
      params: []
    }
  }
  runner(q.sql, q.params, (err, results) => {
    if(err) {
      logger.error({
        type: 'query',
        query: q,
        error: err
      })
    }
    else {
      logger({
        type: 'query',
        query: q,
        results: (results || {}).rows
      })
    }
    done(err, results)
  })
}

// returns an api with:
//  * query({sql,params}, done)        - one off query, client returned automatically    
//  * connection(handler, done)        - all queries via same client - manual return
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

  // wrap the connect method so we pass the query function directly
  // handle the release function
  const connection = (handler, done) => {
    postgresConnect((err, client, release) => {
      if(err) {
        returnConnection()
        return done(err)
      }
      
      // get a query function using the given client
      const runQuery = QueryFactory(client.query.bind(client))
      handler(null, runQuery, (err, results) => {
        release()
        done(err, results)
      })
    })
  }

  // run a transaction with a query object
  const transaction = (handler, done) => {
    connection((runQuery, finish) => {
      async.series({
        begin:   (next) => runQuery('BEGIN', next),
        command: (next) => handler(runQuery, next),
        commit:  (next) => runQuery('COMMIT', next)
      }, (err, results) => {
        if(err) {
          runQuery('ROLLBACK', () => finish(err))
        }
        else {
          finish(null, results.command)
        }
      })
    }, done)
  }


  return {
    query,
    connection,
    transaction
  }
}

module.exports = Client