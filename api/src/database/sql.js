"use strict";
/*

  utility functions for generating sql text
  
*/
function where(params, schema, offset) {
  params = params || {}
  schema = schema || {}
  offset = offset || 1
  const sql = Object.keys(params)
    .map((f, i) => `"${f}" = $${i+offset}${schema[f] ? '::' + schema[f] : ''}`)
    .join("\nand\n")
  params = Object.keys(params).map(f => params[f])
  return {
    sql,
    params
  }
}

function selectSQL(table, params, schema) {
  const clause = where(params, schema)
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
  if(!params) throw new Error('clause params required')
  data = data || {}
  schema = schema || {}
  const placeholders = Object.keys(data)
    .map((f, i) => `"${f}" = $${i+1}${schema[f] ? '::' + schema[f] : ''}`)
    .join(",\n")
  const clause = where(params, schema, Object.keys(data).length + 1)
  params = Object.keys(data).map(f => data[f]).concat(clause.params)
  const sql = `update "${table}" set
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
  if(!clauseObj) throw new Error('clause required')
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