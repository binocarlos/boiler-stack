const sql = require('./sql')


const runQuery = (connection, query, done) => {
  connection((client, finished) => {
    client.query(query.sql, query.params, finished)
  }, done)
}

const select = (connection, table, params, done) => {
  const query = sql.select(table, params)
  runQuery(connection, query, done)
}

const get = (connection, table, params, done) => {
  select(connection, table, params, (err, results) => {
    if(err) return done(err)
    done(null, results.rows)
  })
}

const getOne = (connection, table, params, done) => {
  get(connection, table, params, (err, results) => {
    if(err) return done(err)
    done(null, results[0])
  })
}

const insert = (connection, table, data, done) => {
  const query = sql.insert(table, data)
  runQuery(connection, query, done)
}

const insertOne = (connection, table, data, done) => {
  const query = sql.insert(table, data)
  runQuery(connection, query, (err, results) => {
    if(err) return done(err)
    done(null, results[0])
  })
}

const update = (connection, table, data, params, done) => {
  const query = sql.update(table, data, params)
  runQuery(connection, query, done)
}

const updateOne = (connection, table, data, params, done) => {
  const query = sql.update(table, data, params)
  runQuery(connection, query, (err, results) => {
    if(err) return done(err)
    done(null, results[0])
  })
}

const del = (connection, table, params, done) => {
  const query = sql.delete(table, params)
  runQuery(connection, query, done)
}

function SQL(query, table) {
  
  const select = (connection,params, done) => query(selectSQL(table, params), done)
  const get = (params, done) => {
    select(params, (err, results) => {
      if(err) return done(err)
      done(null, results ? results[0] : null)
    })
  }
  const insert = (data, done) => query(insertSQL(table, data), done)
  const insertOne = (data, done) => {
    insert(data, (err, results) => {
      if(err) return done(err)
      done(null, results ? results[0] : null)
    })
  }
  const update = (data, params, done) => query(updateSQL(table, data, where(params)), done)
  const updateOne = (data, params, done) => {
    update(data, params, (err, results) => {
      if(err) return done(err)
      done(null, results ? results[0] : null)
    })
  }
  const del = (params, done) => query(deleteSQL(table, where(params)), done)
  const raw = (sql, params, done) => {
    query({sql, params}, done)
  }

  return {
    select:select,
    get:get,
    insert:insert,
    insertOne:insertOne,
    update:update,
    updateOne:updateOne,
    del:del,
    raw:raw
  }
}

module.exports = SQL