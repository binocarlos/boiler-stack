"use strict";

const Crud = (db, table) => (db) => {
  const list = (params, mapfn, done) => {
    if(!done) done = mapfn
    db.load(table, params, (err, rows) => {
      if(err) return done(err)
      done(null, mapfn ? rows.map(mapfn) : rows)
    })
  }
  const get = (params, mapfn, done) => {
    if(!done) done = map
    db.load(table, params, (err, rows) => {
      if(err) return done(err)
      done(null, rows[0] && maps.get ? maps.get(rows[0]) : rows[0])
    })
  }
  const insert = (data, done) => db.insert(table, data, done)
  const update = (data, params, done) => db.update(table, data, params, done)
  const del = (params, done) => db.del(table, params, done)
  return {
    list,
    get,
    insert,
    update,
    del,
    raw: db.raw
  }
}

module.exports = Crud