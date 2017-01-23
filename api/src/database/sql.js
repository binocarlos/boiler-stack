/*

  utility functions for generating sql text
  
*/
function where(params, schema) {
  params = params || {}
  schema = schema || {}
  const sql = Object.keys(params)
    .map((f, i) => `"${f}" = $${i+1}${schema[f] ? '::' + schema[f] : ''}`)
    .join("\nand\n")
  params = Object.keys(params).map(f => params[f])
  return {
    sql,
    params
  }
}

function selectSQL(table, params, schema) {
  clause = where(params, schema)
  const sql = `select * from "${table}"
where
${clause.sql}
`
  return {
    sql,
    params: clause.params
  }
}

function insertSQL(table, data, schema) {
  data = data || {}
  schema = schema || {}
  const fields = Object.keys(data)
    .map(f => `"${f}"`)
    .join(",\n")
  const placeholders = Object.keys(data)
    .map((f, i) => `$${i+1}${schema[f] ? '::' + schema[f] : ''}`)
    .join(",\n")
  const params = Object.keys(data)
    .map(f => data[f])
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

function updateSQL(table, data, params, schema) {
  if(!clause) throw new Error('clause required')
  data = data || {}
  schema = schema || {}
  clause = where(params, schema)
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

module.exports = {
  where: where,
  select: selectSQL,
  insert: insertSQL,
  update: updateSQL,
  delete: deleteSQL
}