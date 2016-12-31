import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { combineReducers } from 'redux'
import { hashHistory } from 'react-router'

import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { fork } from 'redux-saga/effects'

import Store from './store'
import messages from './messages'

import Root from './containers/Root'
import AppWrapper from './containers/AppWrapper'
import AppBar from './components/AppBar'

import BoilerPlugin from './plugins/core'

const DEFAULT_SETTINGS = {
  titlebarClickUrl:'/',
  appbarComponent:AppBar,
  hasMenu:false,
  getTitle:(state) => '',
  isReady:(state) => true,
  getAppbarContent:(store) => () => null,
  getMenuContent:(store) => () => null
}

const settingsFactory = (plugins = [], settings = {}) => {
  settings = Object.assign({}, DEFAULT_SETTINGS, settings)
  return plugins.reduce((allSettings, plugin) => {
    return Object.assign({}, allSettings, plugin.getSettings ? plugin.getSettings() : {})
  }, settings)
}

const sagaFactory = (plugins = [], store) => {
  const sagas = plugins.reduce((allSagas, plugin) => {
    return allSagas.concat(plugin.getSagas ? plugin.getSagas(store) : [])
  }, [])

  return function *root() {
    yield sagas.map(fork)
  }
}

const reducerFactory = (plugins = []) => {
  return plugins.reduce((allReducers, plugin) => {
    const pluginReducer = plugin.getReducer ?
      plugin.getReducer() :
      null
    if(!pluginReducer) return allReducers
    return Object.assign({}, allReducers, {
      [plugin.id]:pluginReducer
    })
  }, {})
}

const routeFactory = (store, plugins = [], settings = {}) => {

  // this is needed to get things like passport-slim-ui auth context 
  // into the route factory for an app
  const routeContext = plugins.reduce((context, plugin) => {
    return Object.assign({}, context, plugin.getRouteContext ? plugin.getRouteContext(store) : null)
  }, {})
  
  const appRoutes = plugins.map((plugin, i) => {
    const innerRoutes = plugin.getRoutes ?
      plugin.getRoutes(store, routeContext) :
      null
    return innerRoutes ? (
      <Route key={i}>
        {innerRoutes}
      </Route>
    ) : null
  }).filter(routes => routes)

  const staticComponents = plugins.reduce((statics, plugin) => {
    const pluginStatics = plugin.getStatics ?
      plugin.getStatics(store, routeContext) :
      null
    return statics.concat(pluginStatics || [])
  }, [])

  return (
    <Route path="/" component={AppWrapper} store={store} settings={settings} statics={staticComponents}>
      {appRoutes}
    </Route>
  )
}

const boilerapp = (plugins = [], settings = {}) => {

  // add the boiler application
  plugins = plugins.concat([
    BoilerPlugin()
  ])
  
  settings = settingsFactory(plugins, settings)
  const reducers = reducerFactory(plugins)

  const rootReducer = combineReducers({
    routing: routerReducer,
    ...reducers
  })

  const store = Store(rootReducer, [
    routerMiddleware(hashHistory)
  ], window.__INITIAL_STATE__)

  const saga = sagaFactory(plugins, store)

  const history = syncHistoryWithStore(hashHistory, store)
  const routes = routeFactory(store, plugins, settings)
  
  messages.boot(settings)
  store.runSaga(saga)

  return (
    <Root
      store={store}
      history={history}
      routes={routes} />
  )
}

export default boilerapp