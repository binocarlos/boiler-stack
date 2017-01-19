function where(obj, schema) {
  obj = obj || {}
  schema = schema || {}
  const sql = Object.keys(obj)
    .map((f, i) => `  "${f}" = $${i+1}${schema[f] ? '::' + schema[f] : ''}`)
    .join("\n  and\n")
  const params = Object.keys(obj).map(f => obj[f])
  return {
    sql,
    params
  }
}

function selectSQL(table, clause, schema) {
  clause = where(clause, schema)
  const sql = `select * from "${table}"
where
${clause.sql}
`
  return {
    sql,
    params: clause.params
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
  const params = Object.keys(obj)
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
    params
  }
}

function updateSQL(table, updateData, clauseObj, schema) {
  if(!clause) throw new Error('clause required')
  obj = obj || {}
  schema = schema || {}
  clause = where(clauseObj, schema)
  const placeholders = Object.keys(obj)
    .map((f, i) => `set "${f}" = $${i+1+clause.params.length}${schema[f] ? '::' + schema[f] : ''}`)
    .join(",\n")
  const params = (Object.keys(obj).map(f => obj[f])).concat(clause.params)
  const sql = `update "${table}"
${placeholders}
where
${clause.sql}
returning *
`
  return {
    sql,
    params
  }
}

function deleteSQL(table, clauseObj, schema) {
  if(!clause) throw new Error('clause required')
  const clause = where(clauseObj, schema)
  const sql = `delete from "${table}"
where
${clause.sql}
`
  return {
    sql,
    params: clause.params
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
  const raw = (sql, params, done) => query({sql, params}, done)

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