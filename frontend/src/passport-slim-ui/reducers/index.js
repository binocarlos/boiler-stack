import { combineReducers } from 'redux'

import * as actions from '../actions'
import ApiReducer from './api'
import FormReducer from './form'

const statusapi = ApiReducer({
  types:[
    actions.STATUS.LOADING,
    actions.STATUS.SUCCESS,
    actions.STATUS.FAILURE
  ]
})

const loginapi = ApiReducer({
  types:[
    actions.LOGIN.LOADING,
    actions.LOGIN.SUCCESS,
    actions.LOGIN.FAILURE
  ]
})

const registerapi = ApiReducer({
  types:[
    actions.REGISTER.LOADING,
    actions.REGISTER.SUCCESS,
    actions.REGISTER.FAILURE
  ]
})

const loginform = FormReducer({
  name:'login'
})

const registerform = FormReducer({
  name:'register'
})

const rootReducer = combineReducers({
  statusapi,
  loginapi,
  registerapi,
  loginform,
  registerform
})

export default rootReducer