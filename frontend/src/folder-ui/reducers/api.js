import update from 'immutability-helper'

const DEFAULT_STATE = {
  loading:false,
  loaded:false,
  error:null,
  result:null
}

const apiReducerFactory = (types) => {
  const apiReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case types.request:
        return update(state, {
          loading:true,
          loaded:false,
          error:null
        })
      case types.success:
        return update(state, {
          loading:false,
          loaded:true,
          error:null,
          result:action.result
        })
      case types.failure:
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