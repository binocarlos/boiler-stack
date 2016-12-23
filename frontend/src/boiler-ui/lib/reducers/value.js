// generic reducer that keeps a value
// it can reset to the original value

import update from 'immutability-helper'
import deepCheck from 'deep-check-error'

const REQUIRED_SETTINGS = [
  'value',
  'types.set',
  'types.reset'
]

const ValueReducer = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const DEFAULT_STATE = {
    originalValue: settings.value,
    value: settings.value
  }

  const types = settings.types
  return (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      
      case types.set:
        return update(state, {
          value:{
            $set:action.value
          }
        })

      case types.reset:
        return update(state, {
          originalValue:{
            $set:state.originalValue
          }
        })

      default:
        return state
    }
  }
}

export default ValueReducer