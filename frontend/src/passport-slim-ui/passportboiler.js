/*

  produce settings for a boiler-frontend app that has
  passport auth
  
*/
import React, { Component, PropTypes } from 'react'
import { Route } from 'react-router'

import PassportReducer from './reducers'
import PassportSaga from './sagas'
import PassportAuth from './auth'
import PassportRoutes from './routes'
import Settings from './settings'

const passportBoiler = (passportSettings = {}) => {

  let appSettings = {}
  passportSettings = Settings(passportSettings)

  appSettings.sagas = (appSettings.sagas || []).concat([PassportSaga(passportSettings)])
  appSettings.reducers = Object.assign({}, appSettings.reducers, {
    passport:PassportReducer
  })

  const originalGetRoutes = appSettings.getRoutes

  appSettings.getRoutes = (store) => {
    const auth = PassportAuth(store, passportSettings)

    const originalRoutes = originalGetRoutes ? originalGetRoutes(auth) : null
    const passportRoutes = PassportRoutes(passportSettings)

    return (
      <Route>
        {originalRoutes}
        {passportRoutes}
      </Route>
    )
  }

  return appSettings
}

export default passportBoiler