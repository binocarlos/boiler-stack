import React from 'react'
import { combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { fork } from 'redux-saga/effects'
import bows from 'bows'

import Store from './store'
import messages from './messages'
import AppWrapper from './containers/AppWrapper'
import { RouterProvider } from 'redux-little-router'

import {
  getFunctionName
} from './tools'

const boilerapp = (plugins = []) => {

  messages.boot()

  plugins.forEach(plugin => {
    if(!plugin.id) throw new Error('plugin requires an id')
  })

  // each plugin yields an object with named reducer functions
  // we call combineReducers on a merged object from all plugins
  const getReducers = () => {
    const logger = bows('reducer')
    return plugins
      .filter(plugin => plugin.getReducers)
      .reduce((ret, plugin) => {
        const pluginReducers = plugin.getReducers()
        Object.keys(pluginReducers).forEach(key => logger(plugin.id + ' -> ' + key))
        return Object.assign({}, ret, pluginReducers)
      }, {})
  }

  // gives a plugin the chance to inject middleware
  const getMiddleware = () => {
    const logger = bows('middleware')
    return plugins
      .filter(plugin => plugin.getMiddleware)
      .reduce((ret, plugin) => {
        const pluginMiddleware = plugin.getMiddleware()
        pluginMiddleware.forEach(middleware => logger(plugin.id + ' -> ' + getFunctionName(middleware)))
        return all.concat(pluginMiddleware)
      }, [])
  }

  // the redux-little-router route descriptors
  const getRoutes = (store) => {
    const logger = bows('route')
    return plugins
      .filter(plugin => plugin.getRoutes)
      .reduce((ret, plugin) => {
        const pluginRoutes = plugin.getRoutes(store)
        Object.keys(pluginRoutes || {}).forEach(route => logger(plugin.id + ' -> ' + route))
        return Object.assign({}, ret, pluginRoutes)
      }, {})
  }

  // combine the reducer and middleware
  const getStore = ({ reducer, middleware, routes }) => {
    return Store({
      initialState: window.__INITIAL_STATE__,
      reducer,
      middleware,
      routes
    })
  }

  // get a merge of the plugin statics
  // (things that are on the screen regardless of the route)
  const getStatics = () => {
    const logger = bows('statics')
    return plugins
      .filter(plugin => plugin.getStatics)
      .reduce((ret, plugin) => {
        const pluginStatics = plugin.getStatics(store)
        pluginStatics.forEach(pluginStatic => logger(plugin.id + ' -> ' + pluginStatic.name))
        return all.concat(pluginStatics)
      }, [])
  }

  // loop over an array of saga generator functions and fork each of them
  // this is the 'root' saga that knows nothing about it's children
  const getSagas = () => {
    const logger = bows('saga')
    return plugins
      .filter(plugin => plugin.getSagas)
      .reduce((ret, plugin) => {
        const pluginSagas = plugin.getSagas()
        pluginSagas.forEach(saga => logger(plugin.id + ' -> ' + getFunctionName(saga)))
        return all.concat(pluginSagas)
      }, [])
  }

  const getScreens = () => {
    const logger = bows('screen')
    return plugins
      .filter(plugin => plugin.getScreens)
      .reduce((ret, plugin) => {
        const pluginScreens = plugin.getScreens()
        pluginScreens.forEach(screen => logger(plugin.id + ' -> ' + getFunctionName(screen)))
        return all.concat(pluginScreens)
      }, [])
  }

  // actually run the sagas
  const runSagas = ({ store, sagas }) => {
    function *rootSaga() {
      yield sagas.map(fork)
    }
    store.runSaga(rootSaga)
  }

  // constructors
  const reducers = getReducers()
  const reducer = combineReducers(reducers)
  const middleware = getMiddleware()
  const routes = getRoutes()
  const store = getStore({
    reducer,
    middleware,
    routes
  })
  const statics = getStatics()
  const sagas = getSagas()
  const screens = getScreens()
  

  // the function we export to the app so it can have the opinion about
  // React components we want to render
  return (wrapper) => {

    runSagas({
      store,
      sagas
    })
    
    return (
      <Provider store={store}>
        <RouterProvider store={store}>
          <wrapper statics={statics}>
            {screens}
          </wrapper>
        </RouterProvider>
      </Provider>
    )
  }
}

export default boilerapp