import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import { routerActions } from 'react-router-redux'

import Dashboard from './components/Dashboard'
import Help from './components/Help'
import About from './components/About'

import Toolbars from './toolbars'

const getRoutes = (store, context = {}) => {
  const auth = context.auth
  const toolbars = Toolbars(store)
  
  return (
    <Route>
      <IndexRoute components={Dashboard} onEnter={auth.ensureUser('/login')} />
      <Route path="help" component={Help} />
      <Route path="about" component={About} />
    </Route>
  )
}

export default getRoutes