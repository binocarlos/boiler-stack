"use strict";

const Logger = require('../logger')
const logger = Logger('connection')

const Connection = (postgres) => (handler, done) => {
  postgres.connect((err, client, returnConnection) => {
    if(err) {
      returnConnection()
      return done(err)
    }
    handler(client.query, (err, results) => {
      returnConnection()
      done(err, results)
    })
  })
}

module.exports = Connection