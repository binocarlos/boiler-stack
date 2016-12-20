export const action = (type, payload = {}) => {
  return {type, ...payload}
}

export const getTypes = (base, types) => {
  return types.reduce((acc, type) => {
    acc[type.toLowerCase()] = `${base}_${type}`
    return acc
  }, {})
}

// create adhoc actions used for triggers
export const createActions = (types = []) => (base) => {
  const actionTypes = getTypes(base, types)
  return types.reduce((fns, type) => {
    const typeKey = type.toLowerCase()
    fns[typeKey] = (data) => action(types[typeKey], {data})
  }, {
    types: actionTypes
  })
}

// combine action collections each with 'types' and trigger functions
export const mergeActions = (base, groups = []) => {
  return groups.reduce((allActions, group) => {
    const groupActions = group(base)
    Object.keys(groupActions || {}).forEach(function(key){
      if(key == 'types'){
        allActions.types = Object.assign({}, allActions.types, groupActions.types)
      }
      else{
        allActions[key] = groupActions[key]  
      }
    })
    return allActions
  }, {
    types: {}
  })
}