import React from 'react'
import { combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { RouterProvider } from 'redux-little-router'
import { fork } from 'redux-saga/effects'
import bows from 'bows'

import Store from './store'
import messages from './messages'
import Wrapper from './components/Wrapper'

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
    const reducers = plugins
      .filter(plugin => plugin.getReducers)
      .reduce((ret, plugin) => {
        const pluginReducers = gplugin.getReducers()
        Object.keys(pluginReducers).forEach(key => logger(plugin.id + ' -> ' + key))
        return Object.assign({}, ret, pluginReducers)
      }, {})
    if(Object.keys(reducers).length <= 0){
      throw new Error('no reducers found')
    }
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

  // containers we render into the root view
  const getContainers = () => {
    const logger = bows('containers')
    return plugins
      .filter(plugin => plugin.getContainers)
      .reduce((ret, plugin) => {
        const pluginContainers = plugin.getContainers(store)
        pluginContainers.forEach(pluginContainer => logger(plugin.id + ' -> ' + pluginContainer.name))
        return all.concat(pluginContainers)
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
  const sagas = getSagas()
  const containers = getContainers()

  runSagas({
    store,
    sagas
  })

  // the function we export to the app so it can have the opinion about
  // React components we want to render
  return (wrapper = Wrapper) => {

    return (
      <Provider store={store}>
        <RouterProvider store={store}>
          <wrapper>
            {containers.map((container, i) => {
              return (
                <div key={i}>
                  {container}
                </div>
              )
            })}
          </wrapper>
        </RouterProvider>
      </Provider>
    )
  }
}

export default boilerapp