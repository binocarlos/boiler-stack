export const isUserLoaded = (state) => !state.passport.statusapi.loading && state.passport.statusapi.loaded
export const getUser = (state) => state.passport.statusapi.data
export const getForm = (state, name) => {
  return Object.assign({}, state.passport[name + 'form'], {
    error:state.passport[name + 'api'].error,
    loading:state.passport[name + 'api'].loading
  })
}