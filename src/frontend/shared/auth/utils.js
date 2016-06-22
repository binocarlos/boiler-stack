import { fetchUser } from './actions/user'
import { logoutUser } from './actions/logout'

export function stateMapper(state) {
  var userState = state.user || {}
  var data = userState.data || {}
  var loggedIn = userState && userState.loaded && data.loggedIn
  var shouldLoadUser = !userState.loaded && !userState.loading
  var userLoaded = userState.loaded

  return {
    urls:state.urls,
    userLoaded:userLoaded,
    userLoggedin:loggedIn,
    shouldLoadUser:shouldLoadUser
  }
}

export function dispatchMapper(dispatch) {
  return {
    fetchUser:function(url){
      dispatch(fetchUser(url))
    },
    handleLogout:function(url){
      dispatch(logoutUser(url))
    }
  }
}

// only have an error if the field has been touched
export function processField(field, err = null) {

  var useFields = [
    'onChange',
    'onFocus',
    'onBlur',
    'value'
  ]

  var ret = {}
  useFields.forEach(function(prop){
    ret[prop] = field[prop]
  })

  if(err) field.error = err

  ret.invalid = field.touched && field.error
  if(ret.invalid){
    ret.error = field.error
  }

  return ret 
}

export function collectFieldErrors(fields = []){
  var errorFields = fields.filter(field => field.error)
  if(errorFields.length<=0) return null
  return errorFields.map(field => {
    return field.name + ': ' + field.error
  })
}

export function testEmail(email){
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
}

// default style for a text input
export function inputStyle(opts = {}){
  return {
    width: '100%'
  }
}