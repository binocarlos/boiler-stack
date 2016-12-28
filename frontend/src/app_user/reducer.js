import { combineReducers } from 'redux'

import MenuReducer from '../boiler-ui/lib/plugins/menu/reducer'
import UserReducer from '../boiler-ui/lib/plugins/user/reducer'
import CrudReducer from '../boiler-ui/lib/plugins/crud/reducer'

import {
  menu as menuActions,
  user as userActions,
  installation as installationActions
} from './actions'

const reducer = combineReducers({

  menu: MenuReducer(menuActions),
  user: UserReducer(userActions),
  installation: CrudReducer(installationActions)

})

export default reducer