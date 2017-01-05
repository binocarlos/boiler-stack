"use strict";
const Logger = require('./logger')
const logger = Logger('database')

function Database(postgres) {
  function db(sql, values, done) {
    postgres.connect((err, client, returnConnection) => {
      if(err) {
        logger.error(err)
        return done(err)
      }
      client.query(sql, values, (error, results) => {
        returnConnection()
        if(error){
          logger.error({
            sql,
            values,
            message: error.message,
            stack: error.stack
          })
          return done(error.message)
        }
        logger({
          action: 'query',
          sql,
          values,
          results: (results || []).length
        })
        done(null, results)
      })
    })
  }
  return db
}

module.exports = Database