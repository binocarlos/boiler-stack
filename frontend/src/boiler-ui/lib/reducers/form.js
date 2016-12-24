import update from 'immutability-helper'
import deepCheck from 'deep-check-error'

const DEFAULT_STATE = {
  originalData:{},
  data:{},
  meta:{}
}

const REQUIRED_TYPES = [
  'update',
  'initialize',
  'revert'
]

const FormReducer = (types = {}) => {

  deepCheck(types, REQUIRED_TYPES)
  
  return (state = DEFAULT_STATE, action) => {
    switch (action.type) {

      // used when the user changes form state
      case types.update:
        return update(state, {
          data:{
            $set:action.data
          },
          meta:{
            $set:action.meta
          }
        })

      // used to write initial form state
      case types.initialize:
        return update(state, {
          data:{
            $set:action.data
          },
          originalData:{
            $set:action.data
          },
          meta:{
            $set:null
          }
        })

      // revert to the previous initialize state
      case types.revert:
        return update(state, {
          data:{
            $set:state.originalData
          },
          meta:{
            $set:null
          }
        })
      
      default:
        return state
    }
  }
}

export default FormReducer