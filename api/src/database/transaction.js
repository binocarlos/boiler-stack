"use strict";
/*

  wrapper for a bunch of queries using the sql module
  within a connection / transaction
  with rollback on any error
  
*/
const async = require('async')

const Transaction = (connection) => (handler, done) => {
  connection((client, finish) => {
    async.series([
      (next) => client.query('BEGIN', next),
      (next) => handler(client, next),
      (next) => client.query('COMMIT', next)
    ], (err, results) => {
      if(err) {
        client.query('ROLLBACK', () => finish(err))
      }
      else {
        finish(null, results)
      }
    })
  }, done)
}

module.exports = Transaction