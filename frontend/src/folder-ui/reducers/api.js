import update from 'immutability-helper'

const DEFAULT_STATE = {
  loading:false,
  loaded:false,
  query:null,
  error:null,
  data:null
}

const apiReducerFactory = (types, injector) => {
  const useDefaultState = Object.assign({}, DEFAULT_STATE, {
    data:injector ? injector() : null
  })
  const apiReducer = (state = useDefaultState, action) => {
    switch (action.type) {
      case types.REQUEST:
        return update(state, {
          $merge:{
            query:action.query,
            loading:true,
            loaded:false,
            error:null
          }
        })
      case types.SUCCESS:

        return update(state, {
          $merge:{
            loading:false,
            loaded:true,
            error:null,
            data:action.data
          }
        })
      case types.FAILURE:
        return update(state, {
          $merge:{
            loading:false,
            loaded:true,
            error:action.error,
            data:null
          }
        })
      default:
        return state
    }
  }

  return apiReducer
}

export default apiReducerFactory