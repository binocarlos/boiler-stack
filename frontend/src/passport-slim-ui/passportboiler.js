/*

  produce settings for a boiler-frontend app that has
  passport auth
  
*/
import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'

import PassportReducer from './reducers'
import PassportSaga from './sagas'
import PassportAuth from './auth'
import PassportRoutes from './routes'
import Settings, { AppSettings } from './settings'

import { isUserLoaded, getUserData } from './reducers/selectors'

const passportBoiler = (passportSettings = {}, appSettings = {}) => {

  passportSettings = Settings(passportSettings)
  appSettings = AppSettings(appSettings)

  appSettings.sagas = (appSettings.sagas || []).concat([PassportSaga(passportSettings)])
  appSettings.reducers = Object.assign({}, appSettings.reducers, {
    passport:PassportReducer
  })

  const originalGetRoutes = appSettings.getRoutes

  appSettings.getRoutes = (store, settings) => {
    const auth = PassportAuth(store, passportSettings)

    const originalRoutes = originalGetRoutes ? originalGetRoutes(store, settings, auth) : null
    const passportRoutes = PassportRoutes(passportSettings)

    return (
      <Route>
        <IndexRoute component={settings.welcome} onEnter={auth.ensureUser('/login')} settings={passportSettings} />
        {originalRoutes}
        {passportRoutes}
      </Route>
    )
  }

  const originalGetUserMenu = appSettings.getUserMenu

  appSettings.getUserMenu = () => {

    const origItems = (originalGetUserMenu ? originalGetUserMenu() : null) || []

    return origItems.concat([{
      label:'Sign Out',
      handler:() => {
        document.location = passportSettings.fullLogoutPath
      }
    }])

  }

  return appSettings
}

export default passportBoiler