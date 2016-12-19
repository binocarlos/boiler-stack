import update from 'immutability-helper'
import deepCheck from 'deep-check-error'

const DEFAULT_STATE = {
  open:false
}

const REQUIRED_SETTINGS = [
  'types.toggle'
]

const Toggle = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)
  const types = settings.types
  return (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case types.toggle:
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

export default Toggle