import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'

import AppWrapper from './containers/AppWrapper'

export default (store, settings = {}) => {
  const routes = settings.getRoutes ? settings.getRoutes(store, settings) : null
  return (
    <Route path="/" component={AppWrapper} settings={settings}>
      {routes}
    </Route>
  )
}