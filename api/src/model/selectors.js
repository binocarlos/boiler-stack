"use strict";

const single = (done) => (err, rows) => {
  if(err) return done(err)
  done(null, rows ? rows[0] : null)
}

module.exports = {
  single
}