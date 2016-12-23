import { combineReducers } from 'redux'
import ToggleReducer from '../folder-ui/lib/reducers/toggle'

import { menu } from '../actions'

const MenuPlugin = (settings = {}) => {
  const reducerName = settings.reducerName || 'menu'
  const getReducers = () => {
    return {
      [reducerName]: ToggleReducer()
    }
  }
  return {
    id:'menu_' + reducerName,
    getReducers
  }
}

export default MenuPlugin