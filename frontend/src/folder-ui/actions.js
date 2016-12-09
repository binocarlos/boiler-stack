const action = (type, payload = {}) => {
  return {type, ...payload}
}

const getTypes = (base, types) => {
  return types.reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

/*

  api
  
*/
const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'
const requestTypes = [REQUEST, SUCCESS, FAILURE]
const apiTypes = (base) => {
  return getTypes(base, requestTypes)
}

export const ApiActions = (base) => {
  const types = apiTypes(base)
  return {
    types,
    request: (query, data) => action(types.REQUEST, {query, data}),
    success: (data) => action(types.SUCCESS, {data}),
    failure: (error) => action(types.FAILURE, {error})
  }
}

/*

  tree
  
*/

const TREE_TOGGLE = 'TREE_TOGGLE'
const treeTypes = [TREE_TOGGLE]
const getTreeTypes = (base) => {
  return getTypes(base, treeTypes)
}

export const TreeActions = (base) => {
  const types = getTreeTypes(base)
  return {
    types,
    toggle: (id, value) => action(types.TREE_TOGGLE, {id,value})
  }
}

/*

  table
  
*/

const TABLE_SELECTED = 'TABLE_SELECTED'
const tableTypes = [TABLE_SELECTED]

const getTableTypes = (base) => {
  return getTypes(base, tableTypes)
}

export const TableActions = (base) => {
  const types = getTableTypes(base)
  return {
    types,
    selected: (ids) => action(types.TABLE_SELECTED, {ids})
  }
}

/*

  form
  
*/

const FORM_REQUEST_DATA = 'FORM_REQUEST_DATA'
const FORM_INITIALIZE = 'FORM_INITIALIZE'
const FORM_UPDATE = 'FORM_UPDATE'
const FORM_REVERT = 'FORM_REVERT'
const formTypes = [FORM_REQUEST_DATA, FORM_INITIALIZE, FORM_UPDATE, FORM_REVERT]

const getFormTypes = (base) => {
  return getTypes(base, formTypes)
}

export const FormActions = (base) => {
  const types = getFormTypes(base)
  return {
    types,
    requestData: (mode, params) => action(types.FORM_REQUEST_DATA, {mode, params}),
    initialize: (data) => action(types.FORM_INITIALIZE, {data}),
    update: (data, meta) => action(types.FORM_UPDATE, {data, meta}),
    revert: () => action(types.FORM_REVERT)
  }
}