// reducer imports
import { combineReducers } from 'redux'

import ApiReducer from '../../reducers/api'
import ValueReducer from '../../reducers/value'

const CrudReducer = (actions) => {
  return combineReducers({
    list: combineReducers({
      api: ApiReducer(actions.list.api.types),
      selection: ValueReducer(actions.list.selection.types),
      data: ValueReducer(actions.list.data.types)
    })
  })
}

export default CrudReducer