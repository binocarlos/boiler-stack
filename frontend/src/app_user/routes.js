import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import { routerActions } from 'react-router-redux'

import Dashboard from './components/Dashboard'
import Help from './components/Help'
import About from './components/About'

import Sections from './sections'
import pages from './config/pages'

const getRoutes = (store, context = {}) => {
  const auth = context.auth

  const sections = Sections(store)
  
  return (
    <Route>
      <IndexRoute component={Dashboard} onEnter={auth.ensureUser('/login')} />
      <Route path="help" component={Help} />
      <Route path="about" component={About} />
      <Route onEnter={auth.ensureUser('/login')}>
        <Route path={pages.installation.route}>
          <IndexRoute component={sections.installation.table} />
        </Route>
      </Route>
    </Route>
  )
}

export default getRoutes