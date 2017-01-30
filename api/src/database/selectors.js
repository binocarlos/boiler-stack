"use strict";
const getrows = (result, mapfn) => {
  result = result || {}
  return mapfn ?
    (result.rows || []).map(mapfn) :
    (result.rows || [])
}

const rows = (done, mapfn) => (err, results) => {
  if(err) return done(err)
  done(null, getrows(results, mapfn))
}

const single = (done, mapfn) => (err, results) => {
  if(err) return done(err)
  done(null, getrows(results, mapfn)[0])
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