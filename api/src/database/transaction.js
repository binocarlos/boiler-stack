"use strict";
/*

  wrapper for a bunch of queries using the sql module
  within a connection / transaction
  with rollback on any error
  
*/
const async = require('async')

const Transaction = (connection) => (handler, done) => {
  connection((query, finish) => {
    async.series({
      begin:   (next) => query('BEGIN', next),
      command: (next) => handler(query, next),
      commit:  (next) => query('COMMIT', next)
    }, (err, results) => {
      if(err) {
        query('ROLLBACK', () => finish(err))
      }
      else {
        finish(null, results.command)
      }
    })
  }, done)
}

module.exports = Transaction