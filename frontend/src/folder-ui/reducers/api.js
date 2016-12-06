import update from 'immutability-helper'

const DEFAULT_STATE = {
  loading:false,
  loaded:false,
  error:null,
  result:null
}

const apiReducerFactory = (types) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.')
  }

  const [ requestType, successType, failureType ] = types

  const apiReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case requestType:
        return update(state, {
          loading:true,
          loaded:false,
          error:null
        })
      case successType:
        return update(state, {
          loading:false,
          loaded:true,
          error:null,
          result:action.result
        })
      case failureType:
        return update(state, {
          loading:false,
          loaded:true,
          error:action.error,
          result:null
        })
      default:
        return state
    }
  }

  return apiReducer
}

export default apiReducerFactory