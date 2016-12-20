import {
  getUserData,
  currentInstallation
} from '../boiler-ui/selectors'

import {
  list as tableList,
  selectedTitle
} from '../folder-ui/selectors'

import pages from './config/pages'

const user = {
  data: getUserData
}

const installation = {

  // raw
  raw: (state, key) => key ? state.installation[key] : state.installation,
  list: (state) => installation.raw(state, 'list').data,
  form: (state) => installation.raw(state, 'form'),
  selected: (state) => installation.raw(state, 'selection').selected,
  currentlyDeleting: (state) => installation.raw(state, 'deleteWindow').open,

  // derived
  items: (state) => tableList(installation.list(state)),
  selectedItems: (state) => tableList(installation.list(state), installation.selected(state)),
  selectedTitle: (state) => selectedTitle(installation.selectedItems(state), pages.installation.pluralTitle),
  current: (state) => currentInstallation(state),

  // collections
  dropdown: (state) => {
    currentItem:installation.current(state),
    items:installation.items(state)
  }
}

const selectors = {
  user,
  installation
}

export default selectors