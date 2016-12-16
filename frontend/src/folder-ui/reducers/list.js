/*

  keep track of an array of selected items
  
*/

import update from 'immutability-helper'
import { combineReducers } from 'redux'

const DEFAULT_STATE = {
  selected:[]
}

const ListReducerFactory = (types) => {
  return (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case types.SELECTED:
        return update(state, {
          selected:{
            $set:action.ids
          }
        })
      default:
        return state
    }
  }
}

export default ListReducerFactory