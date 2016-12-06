import update from 'immutability-helper'

const DEFAULT_STATE = {
  open:{}
}

const treeReducerFactory = (types) => {
  if (!Array.isArray(types) || types.length !== 1) {
    throw new Error('Expected types to be an array of one element.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.')
  }

  const [ toggleType ] = types

  const treeReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case toggleType:
        return update(state, {
          open:{
            [action.id]:{
              $set:action.value
            }
          }
        })
      default:
        return state
    }
  }

  return treeReducer
}

export default treeReducerFactory