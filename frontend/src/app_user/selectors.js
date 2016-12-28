import {
  list as tableList,
  selectedTitle
} from '../boiler-ui/lib/selectors'

import screens from './config/screens'

// re-used between login and register
const authSelectors = (raw) => {
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
    loggedIn: (state) => record(state).loggedIn
  }
}

export const user = {
  status: userStatusSelectors(state => state.user.status),
  login: authSelectors(state => state.user.login),
  register: authSelectors(state => state.user.register)
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
  user
}

export default selectors