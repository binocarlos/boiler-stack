import { combineReducers } from 'redux'

import ToggleReducer from '../boiler-ui/lib/reducers/toggle'
import UserReducer from '../boiler-ui/lib/plugins/user/reducer'

import {
  menu,
  user
} from './actions'

const reducer = combineReducers({

  menu: ToggleReducer(menu.types),
  user: UserReducer(user)

})

export default reducer