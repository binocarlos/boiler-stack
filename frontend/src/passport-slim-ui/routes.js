import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'

import FormTabs from './containers/FormTabs'

const DEFAULT_SETTINGS = {
  loginRoute:'login',
  registerRoute:'register',
  primaryKey:'email',
  includeEmail:true,
  includeUsername:false,
  loginContent:null,
  registerContent:null,
  extraFields:[]
}

export default (settings = {}) => {

  settings = Object.assign({}, DEFAULT_SETTINGS, settings)

  return (
    <Route>
      <Route path={settings.loginRoute} component={FormTabs} page="login" settings={settings} />
      <Route path={settings.registerRoute} component={FormTabs} page="register" settings={settings} />
    </Route>
  )
}