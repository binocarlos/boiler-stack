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
        client.query(sql, params, done)
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