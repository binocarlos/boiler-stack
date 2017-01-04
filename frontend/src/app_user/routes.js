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
  }),
  '/clients': user({
    title:'Clients',
    trigger: 'loadClients',
    '/add': {
      title:'Clients : Add',
      trigger: 'addClient',
      api: 'post'
    },
    '/edit/:id': {
      title:'Clients : Edit',
      trigger: 'editClient',
      api: 'put'
    }
  }),
  '/projects': user({
    title:'Projects',
    trigger: 'loadProjects',
    '/add': {
      title:'Projects : Add',
      trigger: 'addProject',
      api: 'post'
    },
    '/edit/:id': {
      title:'Projects : Edit',
      trigger: 'editProject',
      api: 'put'
    }
  })
})

// functions run when a route is loaded
// we can dispatch actions to sagas
export const triggers = {
  initial: [
    plugins.installation.table.actions.list.request()
  ],
  loadInstallations: (routerState) => [
    plugins.installation.table.actions.selection.set([]),
    plugins.installation.table.actions.list.request()
  ],
  loadClients: (routerState) => [
    plugins.client.table.actions.selection.set([]),
    plugins.client.table.actions.list.request()
  ],
  loadProjects: (routerState) => [
    plugins.project.table.actions.selection.set([]),
    plugins.project.table.actions.list.request()
  ],
  addInstallation: (routerState) => plugins.installation.form.actions.fields.initialize({}),
  addClient: (routerState) => plugins.client.form.actions.fields.initialize({}),
  addProject: (routerState) => plugins.project.form.actions.fields.initialize({}),
  editInstallation: (routerState) => [
    plugins.installation.form.actions.fields.initialize({}),
    plugins.installation.form.actions.get.request(null, routerState.params)
  ],
  editClient: (routerState) => [
    plugins.client.form.actions.fields.initialize({}),
    plugins.client.form.actions.get.request(null, routerState.params)
  ],
  editProject: (routerState) => [
    plugins.project.form.actions.fields.initialize({}),
    plugins.project.form.actions.get.request(null, routerState.params)
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

      <Fragment forRoute={getRoute('/clients')}>

        <AbsoluteFragment withConditions={location => location.route === getRoute('/clients')}>
          { plugins.client.table.getContainer() }
        </AbsoluteFragment>

        <Fragment forRoute='/add'>
          { plugins.client.form.getContainer() }
        </Fragment>

        <Fragment forRoute='/edit/:id'>
          { plugins.client.form.getContainer() }
        </Fragment>
        
      </Fragment>

      <Fragment forRoute={getRoute('/projects')}>

        <AbsoluteFragment withConditions={location => location.route === getRoute('/projects')}>
          { plugins.project.table.getContainer() }
        </AbsoluteFragment>

        <Fragment forRoute='/add'>
          { plugins.project.form.getContainer() }
        </Fragment>

        <Fragment forRoute='/edit/:id'>
          { plugins.project.form.getContainer() }
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