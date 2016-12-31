import React, { Component, PropTypes } from 'react'
import { RelativeFragment as Fragment, AbsoluteFragment } from 'redux-little-router'

import Login from './containers/Login'
import Register from './containers/Register'
import InstallationTable from './containers/InstallationTable'

import Home from './components/Home'
import Help from './components/Help'
import About from './components/About'

import actions from './actions'

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
    trigger: 'loadCompanies',
    '/add': {
      title:'Companies ADD',
      '/child': {
        title: 'Child'
      }
    },
    '/edit/:id': {
      title:'Companies EDIT'
    }
  })
})

// functions run when a route is loaded
// we can dispatch actions to sagas
export const triggers = {
  loadCompanies: (routerState) => actions.installation.table.api.list.request()
}

// relative strips the basepath from the current url
export const fragments = (relative) => {
  const compareRoute = (route) => (pathname) => relative(pathname) == route
  return (
    <div className='routeContainer'>

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
          <InstallationTable />
        </AbsoluteFragment>
        <Fragment forRoute='/add'>
          <div>ADD</div>
          <Fragment forRoute='/child'>
            <div>CHILD</div>
          </Fragment>
        </Fragment>
        <Fragment forRoute='/edit/:id'>
          <div>EDIT</div>
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