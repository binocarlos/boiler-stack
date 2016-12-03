export const isUserLoaded = (state) => !state.passport.statusapi.loading && state.passport.statusapi.loaded
export const getUser = (state) => state.passport.statusapi.data
export const getForm = (state, name) => state.passport[name + 'form']