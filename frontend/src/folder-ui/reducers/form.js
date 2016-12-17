import update from 'immutability-helper'

const DEFAULT_STATE = {
  mode:null,
  params:{},
  originalData:{},
  data:{},
  meta:{}
}

const formReducerFactory = (types) => {
  return (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case types.UPDATE:
        return update(state, {
          data:{
            $set:action.data
          },
          meta:{
            $set:action.meta
          }
        })
      case types.INITIALIZE_DATA:
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
      case types.REVERT:
        return update(state, {
          data:{
            $set:state.originalData
          },
          meta:{
            $set:null
          }
        })
      case types.REQUEST_DATA:
        return update(state, {
          mode:{
            $set:action.mode
          },
          params:{
            $set:action.params
          }
        })
      default:
        return state
    }
  }
}

export default formReducerFactory