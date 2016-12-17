/*

  keep track of an array of selected items
  
*/

import update from 'immutability-helper'
import { combineReducers } from 'redux'

const DEFAULT_STATE = {
  open:false
}

const ConfirmDialogReducerFactory = (types) => {
  return (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case types.TOGGLE:
        return update(state, {
          open:{
            $set:action.open
          }
        })
      default:
        return state
    }
  }
}

export default ConfirmDialogReducerFactory