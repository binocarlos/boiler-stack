import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import { routerActions } from 'react-router-redux'
import { getAppbarContent, getMenuContent } from './menus'

import Dashboard from '../components/Dashboard'
import Help from '../components/Help'
import About from '../components/About'

const CoreApp = (settings = {}) => {

  const getRoutes = (store, context) => {
    const auth = context.auth
    return (
      <Route>
        <IndexRoute components={Dashboard} onEnter={auth.ensureUser('/login')} />
        <Route path="help" component={Help} />
        <Route path="about" component={About} />
      </Route>
    )
  }

  const getSettings = () => {
    return {
      getTitle:(state) => 'Boiler Stack',
      hasMenu:true,
      getAppbarContent,
      getMenuContent
    }
  }

  return {
    getSettings,
    getRoutes
  }
}

export default CoreApp