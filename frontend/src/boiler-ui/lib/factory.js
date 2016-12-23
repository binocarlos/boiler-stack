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
      }, {
        test:(state = {}) => state
      })
  }

  // gives a plugin the chance to inject middleware
  const getMiddleware = () => {
    const logger = bows('middleware:factory')
    return plugins
      .filter(plugin => plugin.getMiddleware)
      .reduce((ret, plugin) => {
        const pluginMiddleware = plugin.getMiddleware()
        pluginMiddleware.forEach(middleware => logger('created: ' + plugin.id + ' -> ' + getFunctionName(middleware)))
        return all.concat(pluginMiddleware)
      }, [])
  }

  // the redux-little-router route descriptors
  const getRoutes = (store) => {
    const logger = bows('route:factory')
    return plugins
      .filter(plugin => plugin.getRoutes)
      .reduce((ret, plugin) => {
        const pluginRoutes = plugin.getRoutes(store)
        Object.keys(pluginRoutes || {}).forEach(route => logger('created: ' + plugin.id + ' -> ' + route))
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
    const logger = bows('statics:factory')
    return plugins
      .filter(plugin => plugin.getStatics)
      .reduce((ret, plugin) => {
        const pluginStatics = plugin.getStatics(store)
        pluginStatics.forEach(pluginStatic => logger('created: ' + plugin.id + ' -> ' + pluginStatic.name))
        return all.concat(pluginStatics)
      }, [])
  }

  // loop over an array of saga generator functions and fork each of them
  // this is the 'root' saga that knows nothing about it's children
  const getSagas = () => {
    const logger = bows('saga:factory')
    return plugins
      .filter(plugin => plugin.getSagas)
      .reduce((ret, plugin) => {
        const pluginSagas = plugin.getSagas()
        pluginSagas.forEach(saga => logger('created: ' + plugin.id + ' -> ' + getFunctionName(saga)))
        return all.concat(pluginSagas)
      }, [])
  }

  const runSagas = ({ store, sagas }) => {
    function *rootSaga() {
      console.log('running root saga')
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
  runSagas({
    store,
    sagas
  })
  
  return (
    <Provider store={store}>
      <RouterProvider store={store}>
        <div>
          hello world
        </div>
      </RouterProvider>
    </Provider>
  )
}

export default boilerapp