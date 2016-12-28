// reducer imports
import { combineReducers } from 'redux'

//import ApiReducer from '../boiler-ui/lib/reducers/api'
import ToggleReducer from '../boiler-ui/lib/reducers/toggle'
//import FormReducer from '../boiler-ui/lib/reducers/form'

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