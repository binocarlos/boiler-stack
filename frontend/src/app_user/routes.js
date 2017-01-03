import React, { Component, PropTypes } from 'react'
import { RelativeFragment as Fragment, AbsoluteFragment } from '../boiler-ui/lib/components/Router'

import Login from './containers/Login'
import Register from './containers/Register'

import Home from './components/Home'
import Help from './components/Help'
import About from './components/About'

import actions from './actions'
import plugins from './plugins'

// these tools map in the basepath onto any of the routes
// the basepath is the mountpoint of the app (e.g. '/app' or '/admin')
import { routeProcessor, getRoute, homeRouteMatcher } from './tools'

const guest = (route) => {
  return Object.assign({}, route, {
    requireGuest: getRoute('/')
  })
}

const user = (route) => {
  return Object.assign({}, route, {
    requireUser: getRoute('/')
  })
}

export const routes = routeProcessor({
  '': {},
  '/': {},
  '/help': {
    title:'Help'
  },
  '/about': {
    title:'About'
  },
  '/login': guest({
    title:'Login'
  }),
  '/register': guest({
    title:'Register'
  }),
  '/companies': user({
    title:'Companies',
    trigger: 'loadInstallations',
    '/add': {
      title:'Companies : Add',
      trigger: 'addInstallation',
      api: 'post'
    },
    '/edit/:id': {
      title:'Companies : Edit',
      trigger: 'editInstallation',
      api: 'put'
    }
  })
})

// functions run when a route is loaded
// we can dispatch actions to sagas
export const triggers = {
  loadInstallations: (routerState) => plugins.installation.table.actions.list.request(),
  addInstallation: (routerState) => plugins.installation.form.actions.fields.initialize({}),
  editInstallation: (routerState) => [
    plugins.installation.form.actions.fields.initialize({}),
    plugins.installation.form.actions.get.request(null, routerState.params)
  ]
}

// relative strips the basepath from the current url
export const fragments = (relative) => {
  const compareRoute = (route) => (pathname) => relative(pathname) == route
  return (
    <div className='routeWrapper'>

      <Fragment forRoute={getRoute('')} withConditions={homeRouteMatcher}>
        <Home />
      </Fragment>

      <Fragment forRoute={getRoute('/login')}>
        <Login />
      </Fragment>

      <Fragment forRoute={getRoute('/register')}>
        <Register />
      </Fragment>

      <Fragment forRoute={getRoute('/help')}>
        <Help />
      </Fragment>

      <Fragment forRoute={getRoute('/about')}>
        <About />
      </Fragment>

      <Fragment forRoute={getRoute('/companies')}>

        <AbsoluteFragment withConditions={location => location.route === getRoute('/companies')}>
          { plugins.installation.table.getContainer() }
        </AbsoluteFragment>

        <Fragment forRoute='/add'>
          { plugins.installation.form.getContainer() }
        </Fragment>

        <Fragment forRoute='/edit/:id'>
          { plugins.installation.form.getContainer() }
        </Fragment>
        
      </Fragment>

      

    </div>
  )
}

export default {
  routes,
  triggers,
  fragments
}