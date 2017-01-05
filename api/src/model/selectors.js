"use strict";

const single = (done) => (err, results) => {
  if(err) return done(err)
  done(null, results ? results[0] : null)
}

const command = (done) => (err, results) => {
  if(err) return done(err)
  done(null, results ? results.rows : null)
}

module.exports = {
  single,
  command
}