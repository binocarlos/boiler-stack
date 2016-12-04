import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import AppFactory from '../factory'

const DEFAULT_SETTINGS = {
  openAccess:true
}

const openAccessApp = (settings = {}) => {
  const originalGetRoutes = settings.getRoutes
  settings.getRoutes = (store, settings) => {
    const originalRoutes = originalGetRoutes ? originalGetRoutes(store, settings) : null
    return (
      <Route>
        <IndexRoute component={settings.welcome} />
        {originalRoutes}
      </Route>
    )
  }
  return AppFactory(Object.assign({}, DEFAULT_SETTINGS, settings))
}

export default openAccessApp