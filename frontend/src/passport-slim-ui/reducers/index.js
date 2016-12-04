import { combineReducers } from 'redux'

import * as actions from '../actions'
import ApiReducer from './api'
import FormReducer from './form'
import RouteAssertionReducer from './routeassertion'

const statusApi = ApiReducer({
  types:[
    actions.PASSPORT_STATUS.LOADING,
    actions.PASSPORT_STATUS.SUCCESS,
    actions.PASSPORT_STATUS.FAILURE
  ]
})

const loginApi = ApiReducer({
  types:[
    actions.PASSPORT_LOGIN.LOADING,
    actions.PASSPORT_LOGIN.SUCCESS,
    actions.PASSPORT_LOGIN.FAILURE
  ]
})

const registerApi = ApiReducer({
  types:[
    actions.PASSPORT_REGISTER.LOADING,
    actions.PASSPORT_REGISTER.SUCCESS,
    actions.PASSPORT_REGISTER.FAILURE
  ]
})

const loginForm = FormReducer({
  name:'login'
})

const registerForm = FormReducer({
  name:'register'
})

const routeAssertion = RouteAssertionReducer()

const rootReducer = combineReducers({
  statusApi,
  loginApi,
  registerApi,
  loginForm,
  registerForm,
  routeAssertion
})

export default rootReducer