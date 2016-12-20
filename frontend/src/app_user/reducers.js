// reducer imports
import { combineReducers } from 'redux'
import ApiReducer from '../folder-ui/lib/reducers/api'
import FormReducer from '../folder-ui/lib/reducers/form'
import SelectionReducer from '../folder-ui/lib/reducers/selection'
import ToggleReducer from '../folder-ui/lib/reducers/toggle'

import * as injectors from '../folder-ui/lib/injectors'
import actions from './actions'

const reducers = {
  installation:combineReducers({

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
}

export default reducers