import update from 'immutability-helper'
import deepCheck from 'deep-check-error'

const DEFAULT_STATE = {
  loading:false,
  loaded:false,
  query:null,
  error:null,
  data:null
}

const REQUIRED_SETTINGS = [
  'types.request',
  'types.success',
  'types.failure'
]

const Api = (settings = {}) => {
  deepCheck(types, REQUIRED_SETTINGS)

  const types = settings.types
  const injector = settings.injector
  
  const useDefaultState = Object.assign({}, DEFAULT_STATE, {
    data:injector ? injector() : null
  })

  const injectData = injector ?
    injector :
    (data) => data

  const apiReducer = (state = useDefaultState, action) => {
    switch (action.type) {

      case types.request:
        return update(state, {
          $merge:{
            query:action.query,
            loading:true,
            loaded:false,
            error:null
          }
        })

      case types.success:
        return update(state, {
          $merge:{
            loading:false,
            loaded:true,
            error:null,
            data:injectData(action.data)
          }
        })

      case types.failure:
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

export default Api