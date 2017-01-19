"use strict";

const Logger = require('./logger')
const logger = Logger('query')

function Query(postgres) {
  function runQuery(query, done) {
    const sql = query.sql
    const params = query.params
    postgres.connect((err, client, returnConnection) => {
      if(err) {
        logger.error(err)
        return done(err)
      }
      client.query(sql, params, (error, results) => {
        
        if(error){
          logger.error({
            action: 'query',
            sql,
            params,
            message: error.message,
            stack: error.stack
          })
          return done(error.message)
        }
        
        returnConnection()
        
        const rows = results.rows
        logger({
          action: 'query',
          sql,
          params,
          results: (rows || []).length
        })
        done(null, rows)
      })
    })
  }
  return runQuery
}

module.exports = Query