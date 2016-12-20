// the toolbar buttons above the content in each section
import actions from './actions'
import pages from './config/pages'

import * as buttonTools from '../folder-ui/buttons' 

const route = (page = '', path = '') => pages[page].route + path

const Buttons = (store) => {

  return {

    installation: {

      table: (dispatch, ownProps) => {
        const selectedIds = selectors.installation.selected(store.getState())
        const allIds = selectors.installation.list(store.getState()).ids
        return []
          .concat(buttonTools.crud({
            selected: selectedIds,
            actions:{
              add: () => dispatch(actions.router.redirect(route('installation', '/add'))),
              edit: () => dispatch(actions.router.redirect(route('installation', '/edit/' + selectedIds[0]))),
              delete: () => dispatch(actions.installation.deleteWindow.open())  
            }
          }))
          .concat(buttonTools.divider())
          .concat(buttonTools.selection({
            actions:{
              selectAll: () => dispatch(actions.installation.table.select(allIds)),
              selectNone: () => dispatch(actions.installation.table.select([]))
            }
          }))
      },

      form: (dispatch, ownProps) => {
        
        const selectedIds = state.selectedIds
        return []
          .concat(buttonTools.form({
            selected: state.selected,
            actions:{
              cancel: () => dispatch(actions.router.redirect(route('installation'))),
              revert: () => dispatch(actions.installation.form.revert()),
              save: () => dispatch(actions.installation.deleteWindow.open())  
            }
          }))
      }
    }
  }
}

export default Buttons