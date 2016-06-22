import { USER_REQUEST, USER_RECEIVE, USER_ERROR } from '../actions/user'
import { LOGOUT_RECEIVE } from '../actions/logout'
import { LOGIN_RECEIVE } from '../actions/login'
import apiReducer from '../../api/reducer'

const reducer = apiReducer([
  USER_REQUEST,
  USER_RECEIVE,
  USER_ERROR
])

export default reducer
