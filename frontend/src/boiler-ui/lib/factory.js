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
  const basepath = settings.basepath
  const sagas = settings.sagas
  const middleware = settings.middleware || []
  const initialState = settings.initialState

  messages.boot()

  const store = Store({
    reducer,
    routes,
    middleware,
    initialState
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