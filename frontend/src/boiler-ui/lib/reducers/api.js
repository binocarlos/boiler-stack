// the api reducer keeps the state of the request
// NOT the data (this is the job of the initiating saga)
import update from 'immutability-helper'
import deepCheck from 'deep-check-error'

const DEFAULT_STATE = {
  // are we in a state of loading
  loading:false,
  // have we loaded any data yet
  loaded:false,
  // the query object passed to the last request
  query:null,
  // the error if it occurred
  error:null
}

const REQUIRED_SETTINGS = [
  'types.request',
  'types.success',
  'types.failure'
]

const ApiReducer = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const types = settings.types

  const apiReducer = (state = DEFAULT_STATE, action) => {
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
            error:null
          }
        })

      case types.failure:
        return update(state, {
          $merge:{
            loading:false,
            loaded:true,
            error:action.error
          }
        })
        
      default:
        return state
    }
  }

  return apiReducer
}

export default ApiReducer