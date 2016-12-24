// reducer imports
import { combineReducers } from 'redux'

import ApiReducer from '../boiler-ui/lib/reducers/api'
import ListReducer from '../boiler-ui/lib/reducers/list'
import ToggleReducer from '../folder-ui/lib/reducers/toggle'

/*
import ApiReducer from '../folder-ui/lib/reducers/api'
import FormReducer from '../folder-ui/lib/reducers/form'
import SelectionReducer from '../folder-ui/lib/reducers/selection'

*/

import actions from './actions'

const reducer = combineReducers({

  menu: ToggleReducer(actions.menu),
  installation: combineReducers({

    table: combineReducers({
      api: ApiReducer(actions.installation.table.api),
      list: ListReducer(actions.installation.table.list)
    })

  })

/*
  installation: combineReducers({

    table: combineReducers({

      api: ApiReducer({
        types: actions.installation.table.api.types,
        injector: injectors.list
      })

    // data to drive the table
    list:ApiReducer({
      types: actions.installation.api.list.types,
      injector: injectors.list
    }),

    // selected table ids
    selection:SelectionReducer({
      types: actions.installation.table.types
    }),

    // the data that appears in the add/edit form
    form:FormReducer({
      types: actions.installation.form.types
    }),

    // keep track of if the delete window is currently open
    deleteWindow:ToggleReducer({
      types: actions.installation.deleteWindow.types
    })

  })
*/
})

export default reducer