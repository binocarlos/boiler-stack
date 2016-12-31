import { combineReducers } from 'redux'

import MenuReducer from '../boiler-ui/lib/plugins/menu/reducer'
import UserReducer from '../boiler-ui/lib/plugins/user/reducer'
import TableReducer from '../boiler-ui/lib/plugins/table/reducer'
import FormReducer from '../boiler-ui/lib/plugins/form/reducer'

import {
  menu as menuActions,
  user as userActions,
  installation as installationActions
} from './actions'

const reducer = combineReducers({
  menu: MenuReducer(menuActions),
  user: UserReducer(userActions),
  installation: combineReducers({
    table: TableReducer(installationActions.table),
    form: FormReducer(installationActions.form)
  })
})

export default reducer