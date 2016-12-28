import { combineReducers } from 'redux'

import MenuReducer from '../boiler-ui/lib/plugins/menu/reducer'
import UserReducer from '../boiler-ui/lib/plugins/user/reducer'

import {
  menu as menuActions,
  user as userActions
} from './actions'

const reducer = combineReducers({

  menu: MenuReducer(menuActions),
  user: UserReducer(userActions)

})

export default reducer