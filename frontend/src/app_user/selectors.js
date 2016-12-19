import {
  getUserData,
  currentInstallation
} from '../boiler-ui/selectors'

import {
  list,
  selectedTitle
} from '../folder-ui/selectors'

import pages from './config/pages'


const installationListRaw = (state) => state.installation.list.data
const installationi = (state) => list(installationList(state))

const selectedInstallationIds = (state) => list(state.installation.list.data)

const installationMenu = (state) => {
  return {
    currentItem:currentInstallation(state),
    items:state.installation.list.data
  }
}

const selectedInstallationIds = (state) => state.installation.selection.selected
  
}

const installationTableTitle = (state) => {

}

const installationTable = (state) => {
  const listdata = state.installation.list
  const selected = state.installation.selection.selected
  const table = selectableTable(listdata.db, listdata.ids, selected)
  const items = table.items
  const selectedItems = table.selected
  const title = listTitle(selectedItems, pages.installation.pluralTitle)
  return {
    title,
    items,
    selected,
    selectedItems
  }
}

const selectors = {
  installation:{
    menu:installationMenu,
    table:installationTable
  }
}

export default selectors