"use strict";

const Logger = require('../logger')
const logger = Logger('connection')

const Connection = (postgres) => {
  const getConnection = (handler, done) => {
    postgres.connect((err, client, returnConnection) => {
      if(err) {
        returnConnection()
        logger.error(err)
        return done(err)
      }
      const query = (sql, params, done) => {
        if(typeof(params) == 'function') {
          done = params
          params = []
        }
        if(typeof(sql) == 'object') {
          params = sql.params
          sql = sql.sql
        }
        client.query(sql, params, (err, results) => {
          if(err) {
            logger.error({
              action: 'query',
              query: {sql,params},
              error: err
            })
          }
          else{
            logger({
              action: 'query',
              query: {sql,params},
              results: results
            })
          }
          done(err, results)
        })
      }
      handler(query, (err, results) => {
        returnConnection()
        done(err, results)
      })
    })
  }
  return getConnection
}

module.exports = Connection