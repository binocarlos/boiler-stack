import React from 'react'
import { combineReducers } from 'redux'
import { hashHistory } from 'react-router'

import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'

import SettingsFactory from './settings'
import boilerReducer from './reducer'
import Routes from './routes'
import Store from './store'
import Sagas from './sagas'
import messages from './messages'

import Root from './containers/Root'

const boilerapp = (settings = {}) => {

  settings = SettingsFactory(settings)

  messages.boot(settings)

  const rootReducer = combineReducers({
    routing: routerReducer,
    boiler: boilerReducer,
    ...settings.reducers
  })

  const middleware = [
    routerMiddleware(hashHistory)
  ].concat(settings.middleware)

  const store = Store(rootReducer, middleware, window.__INITIAL_STATE__)
  const history = syncHistoryWithStore(hashHistory, store)
  const routes = Routes(store, settings)
  
  store.runSaga(Sagas(settings.sagas))
  
  return (
    <Root
      store={store}
      history={history}
      routes={routes} />
  )
}

export default boilerapp