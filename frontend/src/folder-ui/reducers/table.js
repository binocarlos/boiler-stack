import update from 'immutability-helper'
import { combineReducers } from 'redux'

const DEFAULT_STATE = {
  selected:[]
}

const tableReducerFactory = (types) => {
  return (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case types.TABLE_SELECTED:
        return update(state, {
          selected:{
            $set:action.selected
          }
        })
      default:
        return state
    }
  }
}

export default tableReducerFactory