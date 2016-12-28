// re-used between login and register
const userAuthSelectors = (raw) => {
  const api = (state) => raw(state).api
  const form = (state) => raw(state).form
  return {
    raw,
    api,
    form,
    formdata: (state) => form(state).data,
    formmeta: (state) => form(state).meta
  }
}

const userStatusSelectors = (raw) => {
  const api = (state) => raw(state).api
  const record = (state) => raw(state).record
  return {
    raw,
    api,
    record,
    loggedIn: (state) => record(state).loggedIn,
    loaded: (state) => record(state).request_count > 0
  }
}

const UserSelectors = (raw) => {
  return {
    status: userStatusSelectors(state => raw(state).status),
    login: userAuthSelectors(state => raw(state).login),
    register: userAuthSelectors(state => state.user.register)
  }
}

export default UserSelectors