import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'

import AppWrapper from './components/AppWrapper'

export default (store, settings = {}) => {

  const routes = settings.getRoutes ? settings.getRoutes(store) : null

  return (
    <Route path="/" component={AppWrapper} settings={settings}>
      <IndexRoute component={settings.welcome}  />
      {routes}
    </Route>
  )
}