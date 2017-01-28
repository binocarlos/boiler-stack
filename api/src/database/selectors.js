"use strict";
const getrows = (result) => {
  result = result || {}
  return result.rows || []
}

const rows = (done) => (err, results) => {
  if(err) return done(err)
  done(null, getrows(results))
}

const single = (done) => (err, results) => {
  if(err) return done(err)
  done(null, getrows(results)[0])
}

const field = (name, done) => (err, results) => {
  if(err) return done(err)
  const row = getrows(results)[0] || {}
  done(null, row[name])
}

const selectors = {
  // return rows from the raw result
  rows,
  single,
  field
}

module.exports = selectors