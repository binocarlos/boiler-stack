import update from 'immutability-helper'
import { combineReducers } from 'redux'

const DEFAULT_STATE = {
  open:{}
}

const treeReducerFactory = (types) => {
  return (state = DEFAULT_STATE, action) => {
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
}

export default treeReducerFactory