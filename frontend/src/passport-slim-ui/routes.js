import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'

import FormTabs from './containers/FormTabs'

export default (settings = {}) => {
  return (
    <Route>
      <Route path={settings.loginRoute} component={FormTabs} page="login" settings={settings} />
      <Route path={settings.registerRoute} component={FormTabs} page="register" settings={settings} />
    </Route>
  )
}