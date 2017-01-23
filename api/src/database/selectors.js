"use strict";
const rows = (result) => {
  result = result || {}
  return result.rows || []
}

const selectors = {
  // return rows from the raw result
  rows: (done) => (err, results) => {
    if(err) return done(err)
    done(null, rows(results))
  },
  // return a single record from the raw resulr
  single: (done) => (err, results) => {
    if(err) return done(err)
    done(null, rows(results)[0])
  }
}

module.exports = selectors