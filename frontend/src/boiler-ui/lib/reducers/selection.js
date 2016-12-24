import update from 'immutability-helper'
import deepCheck from 'deep-check-error'

const DEFAULT_STATE = {
  selected:[]
}

const REQUIRED_TYPES = [
  'select'
]

const SelectionReducer = (types = {}) => {
  deepCheck(types, REQUIRED_TYPES)
  return (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case types.select:
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

export default SelectionReducer