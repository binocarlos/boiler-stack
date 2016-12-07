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
    request: (query) => action(types.REQUEST, query),
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