import {
  list as tableList,
  selectedTitle
} from '../boiler-ui/lib/selectors'

import screens from './config/screens'

export const user = {
  raw: (state) => state.user,
  api: (state) => state.api,
  record: (state) => user.raw(state).record,
  loggedIn: (state) => user.record(state).loggedIn,
  id: (state) => user.record(state).id,
  username: (state) => user.record(state).userdata,
  userdata: (state) => user.record(state).userdata
}

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

const selectors = {
  user,
  installation
}

export default selectors