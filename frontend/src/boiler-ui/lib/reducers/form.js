import update from 'immutability-helper'
import immutable from 'object-path-immutable'
import deepCheck from 'deep-check-error'

const DEFAULT_STATE = {
  data:{},
  meta:{},
  originalData:{},
  originalMeta:{}
}

const REQUIRED_TYPES = [
  'inject',
  'update',
  'revert'
]

const FormReducer = (types = {}) => {

  deepCheck(types, REQUIRED_TYPES)
  
  return (state = DEFAULT_STATE, action) => {
    switch (action.type) {

      case types.inject:
        return update(state, {
          data: {
            $set: action.data
          },
          originalData:{
            $set: action.data
          },
          meta: {
            $set: action.meta
          },
          originalMeta:{
            $set: action.meta
          },
        })

      case types.update:
        return update(state, {
          data:{
            $set: immutable.set(state.data, action.pathname, action.data)
          },
          meta:{
            $set: immutable.set(state.meta, action.pathname, action.meta)
          }
        })

      case types.revert:
        return update(state, {
          data:{
            $set: state.originalData
          },
          meta:{
            $set: state.originalMeta
          }
        })

      default:
        return state
    }
  }
}

export default FormReducer