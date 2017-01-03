import { combineReducers } from 'redux'

import plugins from './plugins'

const reducer = combineReducers({
  menu: plugins.menu.reducer,
  user: plugins.user.reducer,
  installation: combineReducers({
    table: plugins.installation.table.reducer,
    form: plugins.installation.form.reducer
  })
})

export default reducer