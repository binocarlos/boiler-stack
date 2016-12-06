import update from 'immutability-helper'

const DEFAULT_STATE = {
  open:{}
}

const treeReducerFactory = (types) => {
  const treeReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case types.toggle:
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