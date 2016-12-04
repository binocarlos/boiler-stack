import * as actions from './actions'

export default (store, settings = {}) => {

  const ensureUser = (redirectUrl) => (nextState, replace, callback) => {
    store.dispatch(actions.makeRouteAssertion('user', redirectUrl))
    callback()
  }

  return {
    ensureUser
  }
}

export const checkAssertion = (rule, userData) => {
  if(rule == 'user') return userData.loggedIn
  return false
}