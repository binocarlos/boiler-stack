// reducer imports
import { combineReducers } from 'redux'

import ApiReducer from '../../reducers/api'
import ValueReducer from '../../reducers/value'
import ListReducer from '../../reducers/list'

const TableReducer = (actions) => {
  return combineReducers({
    list: ApiReducer(actions.list.types),
    selection: ValueReducer(actions.selection.types),

    // this reduces the result from the list.success
    // action and maps it into a table structure
    data: ListReducer({
      update: actions.list.types.success
    })
  })
}

export default TableReducer