// reducer imports
import { combineReducers } from 'redux'

import ApiReducer from '../../reducers/api'
import ValueReducer from '../../reducers/value'
import ListReducer from '../../reducers/list'

const CrudReducer = (actions) => {
  return combineReducers({
    api: combineReducers({
      list: ApiReducer(actions.api.list.types)
    }),
    selection: ValueReducer(actions.selection.types),
    data: ListReducer({
      update: actions.api.list.types.success
    })
  })
}

export default CrudReducer