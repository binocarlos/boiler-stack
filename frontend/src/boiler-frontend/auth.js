export default (store, settings = {}) => {

  const filterUser = user => {
    return settings.userFilter ?
      settings.userFilter(user) :
      true
  }

  const getUserState = () => {
    return store.getState().passport
  }

  const ensureUser = (redirectUrl) => {
    (nextState, replace, callback) => {
      const passport = getUserState()
      let isAllowed = true

      // redirect to '/login' if there is no user
      if (passport.loaded && !passport.loggedIn) {
        isAllowed = false
      }
      else if(passport.loaded && passport.loggedIn){
        isAllowed = filterUser(passport.user)
      }

      if(!isAllowed){
        replace({
          pathname: redirectUrl
        })
      }
      
      callback()
    }
  }

  return {
    ensureUser
  }
}