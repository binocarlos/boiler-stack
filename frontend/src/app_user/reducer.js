import { combineReducers } from 'redux'

import MenuReducer from '../boiler-ui/lib/plugins/menu/reducer'
import UserReducer from '../boiler-ui/lib/plugins/user/reducer'
import CrudTableReducer from '../boiler-ui/lib/plugins/crudtable/reducer'

import {
  menu as menuActions,
  user as userActions,
  installation as installationActions
} from './actions'

const reducer = combineReducers({

  menu: MenuReducer(menuActions),
  user: UserReducer(userActions),
  installation: combineReducers({
    table: CrudTableReducer(installationActions.table)
  })
})

export default reducer