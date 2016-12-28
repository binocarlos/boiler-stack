import {
  list as tableList,
  selectedTitle
} from '../boiler-ui/lib/selectors'

import screens from './config/screens'

// re-used between login and register
const auth = (raw) => {
  const authSelector = {
    raw,
    api: (state) => authSelector.raw(state).api,
    form: (state) => authSelector.raw(state).form,
    formdata: (state) => authSelector.form(state).data,
    formmeta: (state) => authSelector.form(state).meta
  }
  return authSelector
}

export const user = {
  status: {
    raw: (state) => state.user.status,
    api: (state) => user.status.raw(state).api,
    loaded: (state) => user.status.api(state).loaded,
    record: (state) => user.status.raw(state).record,
    loggedIn: (state) => user.record(state).loggedIn,
    id: (state) => user.record(state).id,
    username: (state) => user.record(state).userdata,
    userdata: (state) => user.record(state).userdata
  },
  login: auth(state => state.user.login),
  register: auth(state => state.user.register)
}

/*
export const installation = {

  // raw
  raw: (state) => key ? state.installation[key] : state.installation,
  list: (state) => installation.raw(state, 'list').data,
  form: (state) => installation.raw(state, 'form'),
  selected: (state) => installation.raw(state, 'selection').selected,
  currentlyDeleting: (state) => installation.raw(state, 'deleteWindow').open,

  // derived
  items: (state) => tableList(installation.list(state)),
  selectedItems: (state) => tableList(installation.list(state), installation.selected(state)),
  selectedTitle: (state) => selectedTitle(installation.selectedItems(state), screens.installation.pluralTitle),
  current: (state) => user.data(state).currentInstallation,

  // collections
  dropdown: (state) => {
    return {
      currentItem:installation.current(state),
      items:installation.items(state)
    }
  }
}
*/
const selectors = {
  user,
  login,
  register/*,
  installation*/
}

export default selectors