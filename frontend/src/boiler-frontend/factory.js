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

import BoilerApp from './boilerapp'

const DEFAULT_SETTINGS = {
  titlebarClickUrl:'/',
  appbarComponent:AppBar,
  hasMenu:false,
  getTitle:(state) => '',
  isReady:(state) => true,
  getAppbarContent:(state, dispatch) => null,
  getMenuContent:(state, dispatch) => null
}

const settingsFactory = (apps, settings = {}) => {
  settings = Object.assign({}, DEFAULT_SETTINGS, settings)
  return apps.reduce((allSettings, app) => {
    return Object.assign({}, allSettings, app.getSettings ? app.getSettings() : {})
  }, settings)
}

const sagaFactory = (apps = []) => {
  const sagas = apps.reduce((allSagas, app) => {
    return allSagas.concat(app.getSagas ? app.getSagas() : [])
  }, [])

  return function *root() {
    yield sagas.map(fork)
  }
}

const reducerFactory = (apps = []) => {
  return apps.reduce((allReducers, app) => {
    return Object.assign({}, allReducers, app.getReducers ? app.getReducers() : {})
  }, {})
}

const routeFactory = (store, apps = [], settings = {}) => {

  const routeContext = apps.reduce((context, app) => {
    return Object.assign({}, context, app.getRouteContext ? app.getRouteContext(store) : null)
  }, {})
  
  const appRoutes = apps.map((app, i) => {
    const innerRoutes = app.getRoutes ?
      app.getRoutes(store, routeContext) :
      null
    return innerRoutes ? (
      <Route key={i}>
        {innerRoutes}
      </Route>
    ) : null
  }).filter(routes => routes)

  return (
    <Route path="/" component={AppWrapper} settings={settings}>
      {appRoutes}
    </Route>
  )
}

const boilerapp = (apps = [], settings = {}) => {

  // add the boiler application
  apps = apps.concat([
    BoilerApp()
  ])
  
  settings = settingsFactory(apps, settings)
  const reducers = reducerFactory(apps)
  const saga = sagaFactory(apps)

  const rootReducer = combineReducers({
    routing: routerReducer,
    ...reducers
  })

  const store = Store(rootReducer, [
    routerMiddleware(hashHistory)
  ], window.__INITIAL_STATE__)

  const history = syncHistoryWithStore(hashHistory, store)
  const routes = routeFactory(store, apps, settings)
  
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