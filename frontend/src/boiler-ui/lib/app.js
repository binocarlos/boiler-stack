import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { combineReducers } from 'redux'
import { fork } from 'redux-saga/effects'

import Root from './containers/Root'
import AppWrapper from './containers/AppWrapper'
import Store from './store'

const boilerapp = (plugins = []) => {

  const combineObject = (fn, args = []) => {
    return plugins
      .filter(plugin => plugin[fn])
      .reduce((allItems, plugin) => Object.assign({}, allItems, plugin[fn].apply(null, args)), {})
  }

  const combineArray = (fn, args = []) => {
    return plugins
      .filter(plugin => plugin[fn])
      .reduce((allItems, plugin) => allItems.concat(plugin[fn].apply(null, args)), [])
  }

  // each plugin yields an object with named reducer functions
  // we call combineReducers on a merged object from all plugins
  const getReducer = () => {
    const reducers = combineObject('getReducers')
    return combineReducers(reducers)
  }

  // gives a plugin the chance to inject middleware
  const getMiddleware = () => {
    return combineArray('getMiddleware')
  }

  // combine the reducer and middleware
  const getStore = () => {
    return Store(
      getReducer(),
      getMiddleware(),
      window.__INITIAL_STATE__
    )
  }

  // loop over an array of saga generator functions and fork each of them
  // this is the 'root' saga that knows nothing about it's children
  const getSaga = (store) => {
    const sagas = combineArray('getSagas', [store])
    return function *root() {
      yield sagas.map(fork)
    }
  }

  // return a react router hooked up to routes merged from each plugin
  const getRoutes = (store) => {
    // get a merged route context from each plugin
    // this lets the routes use stuff provided by other plugins (like auth)
    const routeContext = combineObject('getRouteContext', [store])
    
    // get a merge of the plugin routes
    const routes = plugins
      .filter(plugin => plugin.getRoutes)
      .map((plugin, i) => {
        return (
          <Route key={i}>
            {plugin.getRoutes(store, routeContext)}
          </Route>
        )
      })

    // get a merge of the plugin statics
    // (things that are on the screen regardless of the route)
    const statics = plugins
      .filter(plugin => plugin.getStatics)
      .map((plugin, i) => {
        return (
          <Route key={i}>
            {plugin.getRoutes(store, routeContext)}
          </Route>
        )
      })
      
    // the top level route with the AppWrapper
    // (which renders the layout + statics)
    return (
      <Route path="/" component={AppWrapper} store={store} statics={statics}>
        {routes}
      </Route>
    )
  }

  const store = getStore()
  const saga = getSaga(store)

  const history = syncHistoryWithStore(hashHistory, store)
  const router = getRoutes(store)

  store.runSaga(saga)

  return (
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  )
}

export default boilerapp