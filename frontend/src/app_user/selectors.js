import {
  list as tableList,
  selectedTitle
} from '../boiler-ui/lib/selectors'

import screens from './config/screens'

const user = {
  raw: (state) => state.user,
  data: (state) => (user.raw(state) || {}).data
}

const installation = {

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