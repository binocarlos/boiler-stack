import update from 'immutability-helper'

const DEFAULT_STATE = {
  loading:false,
  loaded:false,
  data:null,
  error:null
}

export default function apiReducerFactory({ types }){

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.')
  }

  return function apiReducer(state = DEFAULT_STATE, action = {}) {
    switch (action.type) {

      case types[0]:
        return update(state, {
          $set:{
            loading:true,
            loaded:false,
            loggedIn:false,
            data:null
          }
        })

      case types[1]:
        return update(state, {
          $set:{
            loading:false,
            loaded:true,
            data:action.data,
            error:null
          }
        })

      case types[2]:
        return update(state, {
          $set:{
            loading:false,
            loaded:true,
            data:null,
            error:action.error
          }
        })

      default:
        return state
    }
  }
}