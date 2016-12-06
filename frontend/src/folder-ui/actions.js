/*

  types
  
*/
const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

const requestTypes = [REQUEST, SUCCESS, FAILURE]

const createRequestTypes = (base) => {
  return requestTypes.reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

const action = (type, payload = {}) => {
  return {type, ...payload}
}



/*

  tree
  
*/

const TREE_TOGGLE = 'TREE_TOGGLE'

const treeTypes = (base) => {
  return requestTypes.concat([TREE_TOGGLE]).reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

const treeActions = (base) => {
  const types = createTreeTypes(base)
  return {
    types,
    request: () => action(types.REQUEST),
    success: (data) => action(types.SUCCESS, {data}),
    failure: (error) => action(types.FAILURE, {error}),
    toggle: (id, value) => action(types.TREE_TOGGLE, {id,value})
  }
}

/*

  table
  
*/

const TABLE_SELECTED = 'TABLE_SELECTED'

const tableTypes = (base) => {
  return requestTypes.concat([TABLE_SELECTED]).reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

export const tableActions = (base) => {
  const types = createTreeTypes(base)
  return {
    types,
    request: () => action(types.REQUEST),
    success: (data) => action(types.SUCCESS, {data}),
    failure: (error) => action(types.FAILURE, {error}),
    selected: (ids) => action(types.TABLE_SELECTED, {ids})
  }
}