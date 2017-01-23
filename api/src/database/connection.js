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
      handler(client, (err, results) => {
        returnConnection()
        done(err, results)
      })
    })
  }

  const runQuery = (query, done) => {
    getConnection((client, finished) => {
      client.query(query.sql, query.params, finished)
    }, done)
  }

  return getConnection
}

module.exports = Connection