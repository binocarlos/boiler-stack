import { REGISTER_RESET, LOGIN_RESET, SWITCH_LOGIN_MODE, UPDATE_EMAIL, UPDATE_PASSWORD } from '../actions/loginform'
import { REGISTER_RECEIVE } from '../actions/register'
import { LOGIN_RECEIVE } from '../actions/login'

const initialState = {
  mode: 'login',
  justRegistered:false,
  justLoggedIn:false
}

export default function update(state = initialState, action) {
  switch (action.type) {
    case REGISTER_RESET:
      return Object.assign({}, state, {
        loginMessage:action.message,
        justRegistered:false
      })
    case LOGIN_RESET:
      return Object.assign({}, state, {
        justLoggedIn:false
      })
    case SWITCH_LOGIN_MODE:
      return Object.assign({}, state, {
        justRegistered:false,
        mode:action.mode
      })
    case REGISTER_RECEIVE:
      // switch the login form to the login tab
      // just after they have registered
      return Object.assign({}, state, {
        mode:'login',
        // signal that we have just registered
        justRegistered:true
      })
    case LOGIN_RECEIVE:
      return Object.assign({}, state, {
        justLoggedIn:action.data.loggedIn ? true : false
      })
    default:
      return state
  }
}
