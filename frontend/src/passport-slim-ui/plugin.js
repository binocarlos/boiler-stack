import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import { combineReducers } from 'redux'

import PassportReducer from './reducers'
import PassportSaga from './sagas'
import PassportAuth from './auth'
import PassportRoutes from './routes'
import PassportSettings from './settings'
import { isUserLoaded, getUserData } from './selectors'

const PassportPlugin = (settings = {}) => {

  const passportSettings = PassportSettings(settings)

  const getReducers = () => {
    return {
      passport:PassportReducer
    }
  }

  const getSagas = () => {
    return [
      PassportSaga(passportSettings)
    ]
  }

  const getSettings = () => {
    return {
      isReady:(state) => isUserLoaded(state)
    }
  }

  const getRouteContext = (store) => {
    return {
      auth:PassportAuth(store)
    }
  }

  const getRoutes = (store, context) => {
    return PassportRoutes(passportSettings)
  }

  return {
    getReducers,
    getSagas,
    getSettings,
    getRouteContext,
    getRoutes
  }
}

export default PassportPlugin