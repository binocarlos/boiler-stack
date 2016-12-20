import {
  getUserData,
  currentInstallation
} from '../boiler-ui/selectors'

import {
  list,
  selectedTitle
} from '../folder-ui/selectors'

import pages from './config/pages'

/*

  installation
  
*/

const installationListRaw = (state) => state.installation.list.data
const installationListIds = (state) => installationListRaw(state).ids
const installationListDb = (state) => installationListRaw(state).db
const installationListItems = (state) => list(installationListRaw(state))
const installationListSelectedIds = (state) => state.installation.selection.selected
const installationListSelectedItems = (state) => {
  const db = installationListDb(state)
  return installationListSelectedIds(state).map(id => db[id])
}

// the drop down list of installations
const installationMenu = (state) => {
  return {
    // boiler-ui provides this selector
    currentItem:currentInstallation(state),
    items:installationListItems(state)
  }
}

const installationTableToolbar = (state) => {
  const selectedItems = installationListSelectedItems(state)
  return {
    title:selectedTitle(selectedItems, pages.installation.pluralTitle),
    selectedIds:installationListSelectedIds(state),
    selectedItems
  }
}

const installationTable = (state) => {
  return {
    items:installationListItems(state),
    selected:installationListSelectedIds(state)
  }
}

const selectors = {
  installation:{
    menu:installationMenu,
    tableToolbar:installationTableToolbar,
    table:installationTable
  }
}

export default selectors