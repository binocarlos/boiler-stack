// the toolbar buttons above the content in each section
import actions from './actions'
import pages from './config/pages'

import * as buttonTools from '../folder-ui/buttons' 

const route = (page = '', path = '') => pages[page].route + path

const Buttons = (store) => {

  const tools = ButtonTools(store)

  return {

    installation: {

      table: (ownProps) => {
        const selectedIds = selectors.installation.selected(store.getState())
        const allIds = selectors.installation.list(store.getState()).ids
        return []
          .concat(buttonTools.crud({
            selected: selectedIds,
            actions:{
              add: () => store.dispatch(actions.router.redirect(route('installation', '/add'))),
              edit: () => store.dispatch(actions.router.redirect(route('installation', '/edit/' + selectedIds[0]))),
              delete: () => store.dispatch(actions.installation.confirmDelete.open())  
            }
          }))
          .concat(buttonTools.divider())
          .concat(buttonTools.selection({
            actions:{
              selectAll: () => store.dispatch(actions.installation.selection.select(allIds)),
              selectNone: () => store.dispatch(actions.installation.selection.select([]))
            }
          }))
      },

      form: (ownProps) => {
        
        const selectedIds = state.selectedIds
        return []
          .concat(buttonTools.form({
            selected: state.selected,
            actions:{
              cancel: () => store.dispatch(actions.router.redirect(route('installation'))),
              revert: () => store.dispatch(actions.installation.form.revert()),
              save: () => store.dispatch(actions.installation.confirmDelete.open(selectedIds))  
            }
          }))
      }
    }
  }
}

export default Buttons