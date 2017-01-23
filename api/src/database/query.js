"use strict";

// run a generic query via the connection
// the query has:
//  * sql
//  * params

const Logger = require('../logger')
const logger = Logger('query')

const Query = (connection) => (query, done) => {
  if(typeof(query) == 'string') {
    query = {
      sql: query,
      params: []
    }
  }
  connection((client, finished) => {
    client.query(query.sql, query.params, (err, results) => {
      if(err) {
        logger.error({
          query,
          error: err
        })
        return finished(err)
      }
      else {
        logger({
          query,
          results
        })
        return finished(null, results)
      }
    })
  }, done)
}

module.exports = Query