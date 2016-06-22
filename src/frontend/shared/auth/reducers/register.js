import { REGISTER_REQUEST, REGISTER_RECEIVE, REGISTER_ERROR } from '../actions/register'
import apiReducer from '../../api/reducer'

const reducer = apiReducer([
  REGISTER_REQUEST,
  REGISTER_RECEIVE,
  REGISTER_ERROR
],{
  /*
  
    this assumes the mongoose style valiation errors
    
  */
  error:function(state, action){

    state.error = action.data.message
    state.formErrors = {}
    Object.keys(action.data.errors || {}).forEach(function(key){
      state.formErrors[key] = action.data.errors[key].message
    })

    return state
  }
})

export default reducer
