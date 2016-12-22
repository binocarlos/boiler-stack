import React from 'react'
import { combineReducers } from 'redux'
import { Provider } from 'react-redux'

import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { Route, IndexRoute, Router, hashHistory } from 'react-router'

import { fork } from 'redux-saga/effects'
import bows from 'bows'

import Store from './store'
import AppWrapper from './containers/AppWrapper'

const functionName = (fun) => {
  let ret = fun.toString()
  ret = ret.substr('function '.length)
  ret = ret.substr(0, ret.indexOf('('))
  return ret
}

const boilerapp = (plugins = []) => {

  plugins.forEach(plugin => {
    if(!plugin.name) throw new Error('plugin requires a name')
  })

  // each plugin yields an object with named reducer functions
  // we call combineReducers on a merged object from all plugins
  const getReducers = () => {
    const logger = bows('reducer:factory')
    return plugins
      .filter(plugin => plugin.getReducers)
      .reduce((ret, plugin) => {
        const pluginReducers = plugin.getReducers()
        Object.keys(pluginReducers).forEach(key => logger('created: ' + plugin.id + ' -> ' + key))
        return Object.assign({}, ret, pluginReducers)
      }, {})
  }

  // gives a plugin the chance to inject middleware
  const getMiddleware = () => {
    const logger = bows('middleware:factory')
    return plugins
      .filter(plugin => plugin.getMiddleware)
      .reduce((ret, plugin) => {
        const pluginMiddleware = plugin.getMiddleware()
        pluginMiddleware.forEach(middleware => logger('created: ' + plugin.id + ' -> ' + functionName(middleware)))
        return all.concat(pluginMiddleware)
      }, [])
  }

  // combine the reducer and middleware
  const getStore = (reducer, middleware) => {
    return Store(
      reducer,
      middleware,
      window.__INITIAL_STATE__
    )
  }

  // loop over an array of saga generator functions and fork each of them
  // this is the 'root' saga that knows nothing about it's children
  const getSagas = (store) => {
    const logger = bows('saga:factory')
    return plugins
      .filter(plugin => plugin.getSagas)
      .reduce((ret, plugin) => {
        const pluginSagas = plugin.getSagas(store)
        pluginSagas.forEach(saga => logger('created: ' + plugin.id + ' -> ' + functionName(saga)))
        return all.concat(pluginSagas)
      }, [])
  }

  // return a react router hooked up to routes merged from each plugin
  const getRoutes = (store) => {
    // get a merged route context from each plugin
    // this lets the routes use stuff provided by other plugins (like auth)
    const routeContextLogger = bows('routeContext:factory')
    const routeContext = plugins
      .filter(plugin => plugin.getRouteContext)
      .reduce((ret, plugin) => {
        const pluginRouteContext = plugin.getRouteContext()
        Object.keys(pluginRouteContext).forEach(key => logger('created: ' + plugin.id + ' -> ' + key))
        return Object.assign({}, ret, pluginRouteContext)
      }, {})

    // get a merge of the plugin statics
    // (things that are on the screen regardless of the route)
    const statics = plugins
      .filter(plugin => plugin.getStatics)
      .reduce((ret, plugin) => {
        const pluginStatics = plugin.getStatics(store)
        pluginStatics.forEach(pluginStatic => logger('created: ' + plugin.id + ' -> ' + pluginStatic.name))
        return all.concat(pluginStatics)
      }, [])
      .map((pluginStatic, i) => {
        return (
          <div key={i}>
            {pluginStatic}
          </div>
        )
      })

    // get a merge of the plugin routes
    const routes = plugins
      .filter(plugin => plugin.getRoutes)
      .reduce((ret, plugin) => {
        const pluginRoutes = plugin.getRoutes(store)
        pluginRoutes.forEach(route => logger('created: ' + plugin.id + ' -> ' + route.path))
        return all.concat(pluginRoutes)
      }, [])

    return {
      path: '/',
      component: AppWrapper,
      store: store,
      childRoutes: routes,
      statics: (
        <div>
          {statics}
        </div>
      )
    }
  }

  // reducers
  const reducers = getReducers()
  reducers.routing = routerReducer
  const reducer = combineReducers(reducers)

  // middleware
  const middleware = getMiddleware()
  middleware.push(routerMiddleware(hashHistory))

  // store
  const store = getStore(reducer, middleware)
  
  // routes
  const history = syncHistoryWithStore(hashHistory, store)
  const routes = getRoutes(store)

  // sagas
  const sagas = getSagas(store)
  function *rootSaga() {
    yield sagas.map(fork)
  }
  store.runSaga(rootSaga)

  // redux provider
  return (
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  )
}

export default boilerapp