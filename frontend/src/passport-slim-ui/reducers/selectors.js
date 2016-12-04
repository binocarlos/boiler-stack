export const statusData = (state) => state.passport.statusApi
export const isUserLoaded = (state) => !statusData(state).loading && statusData(state).loaded
export const isUserLoggedIn = (state) => isUserLoaded(state) && getUser(state).loggedIn
export const getUser = (state) => statusData(state).data
export const getUserData = (state) => isUserLoggedIn(state) ? getUser(state).data : null
export const getForm = (state, name) => {
  return Object.assign({}, state.passport[name + 'Form'], {
    error:state.passport[name + 'Api'].error,
    loading:state.passport[name + 'Api'].loading
  })
}
export const getRouteAssertion = (state) => state.passport.routeAssertion
export const hasRouteAssertion = (state) => getRouteAssertion(state).active