import ToggleReducer from '../reducers/toggle'

import { menu } from '../actions'

const MenuPlugin = (settings = {}) => {

  const reducerName = settings.reducerName || 'menu'

  const getReducers = () => {
    return {
      [reducerName]: ToggleReducer()
    }
  }
  
  return {
    id:reducerName,
    getReducers
  }
}

export default MenuPlugin