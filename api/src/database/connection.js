"use strict";

const Logger = require('../logger')
const logger = Logger('connection')

function Connection(postgres) {
  function getConnection(handler, done) {
    postgres.connect((err, client, returnConnection) => {
      if(err) {
        logger.error(err)
        return done(err)
      }
      handler(client, (err, results) => {
        returnConnection()
        done(err, results)
      })
    })
  }
  return getConnection
}

module.exports = Connection