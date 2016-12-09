import update from 'immutability-helper'

const DEFAULT_STATE = {
  originalData:{},
  data:{},
  meta:{}
}

const formReducerFactory = (types) => {
  return (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case types.FORM_UPDATE:
        return update(state, {
          data:{
            $set:action.data
          },
          meta:{
            $set:action.meta
          }
        })
      case types.FORM_INITIALIZE:
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
      case types.FORM_REVERT:
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

export default formReducerFactory