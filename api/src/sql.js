function where(obj, schema) {
  obj = obj || {}
  schema = schema || {}
  const sql = Object.keys(obj)
    .map((f, i) => `  "${f}" = $${i+1}${schema[f] ? '::' + schema[f] : ''}`)
    .join("\n  and\n")
  const values = Object.keys(obj).map(f => obj[f])
  return {
    sql,
    values
  }
}

function selectSQL(table, obj, schema) {
  const clause = where(obj, schema)
  const sql = `select * from "${table}"
where
${clause.sql}
`
  return {
    sql,
    values: clause.values
  }
}

function insertSQL(table, obj, schema) {
  obj = obj || {}
  schema = schema || {}
  const fields = Object.keys(obj)
    .map(f => `  "${f}"`)
    .join(",\n")
  const placeholders = Object.keys(obj)
    .map((f, i) => `  $${i+1}${schema[f] ? '::' + schema[f] : ''}`)
    .join(",\n")
  const values = Object.keys(obj)
    .map(f => obj[f])
  const sql = `insert into "${table}"
(
${fields}
)
values
(
${placeholders}
)
returning *
`
  return {
    sql,
    values
  }
}

function updateSQL(table, obj, clause, schema) {
  obj = obj || {}
  schema = schema || {}
  if(!clause) throw new Error('clause required')
  clauseValues = clauseValues || []
  const placeholders = Object.keys(obj)
    .map((f, i) => `set "${f}" = $${i+1+clause.values.length}${schema[f] ? '::' + schema[f] : ''}`)
    .join(",\n")
  const values = clause.values.concat(Object.keys(obj).map(f => obj[f]))
  const sql = `update "${table}"
${placeholders}
where
${clause.sql}
returning *
`
  return {
    sql,
    values
  }
}

function deleteSQL(table, clause) {
  obj = obj || {}
  if(!clause) throw new Error('clause required')
  const sql = `delete from "${table}"
where
${clause.sql}
`
  return {
    sql,
    values: clause.values
  }
}

function SQL(query, table) {
  const select = (params, done) => query(selectSQL(table, params), done)
  const get = (params, done) => {
    select(params, (err, results) => {
      if(err) return done(err)
      done(null, results ? results[0] : null)
    })
  }
  const insert = (data, done) => query(insertSQL(table, data), done)
  const update = (data, params, done) => query(updateSQL(table, data, where(params)), done)
  const del = (params, done) => query(deleteSQL(table, where(params)), done)
  const raw = (sql, params, done) => query({sql, params}, done)

  return {
    select:select,
    get:get,
    insert:insert,
    update:update,
    del:del,
    raw:raw
  }
}

module.exports = SQL