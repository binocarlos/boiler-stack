import React from 'react'
import { combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { RouterProvider } from 'redux-little-router'
import { fork } from 'redux-saga/effects'
import bows from 'bows'
import deepCheck from 'deep-check-error'

import Store from './store'
import messages from './messages'

import {
  getFunctionName
} from './tools'

const REQUIRED_SETTINGS = [
  'reducer',
  'routes',
  'sagas'
]

const boilerapp = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const reducer = settings.reducer
  const routes = settings.routes
  const sagas = settings.sagas
  const middleware = settings.middleware || []

  messages.boot()

  // combine the reducer and middleware
  const getStore = ({ reducer, middleware, routes }) => {
    return Store({
      initialState: window.__INITIAL_STATE__,
      reducer,
      middleware,
      routes
    })
  }

  // actually run the sagas
  const runSagas = ({ store, sagas }) => {
    function *rootSaga() {
      yield sagas.map(fork)
    }
    store.runSaga(rootSaga)
  }

  const store = getStore({
    reducer,
    middleware,
    routes
  })

  function *rootSaga() {
    yield sagas.map(fork)
  }
  store.runSaga(rootSaga)

  return (content) => {
    return (
      <Provider store={store}>
        <RouterProvider store={store}>
          {content}
        </RouterProvider>
      </Provider>
    )
  }
}

export default boilerapp