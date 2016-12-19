import update from 'immutability-helper'
import deepCheck from 'deep-check-error'

const DEFAULT_STATE = {
  selected:[]
}

const REQUIRED_SETTINGS = [
  'types.select'
]

const Selection = (settings = {}) => {
  deepCheck(types, REQUIRED_SETTINGS)
  const types = settings.types
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

export default Selection