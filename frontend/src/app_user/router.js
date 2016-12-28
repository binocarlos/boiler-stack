import React, { Component, PropTypes } from 'react'
import { RelativeFragment as Fragment } from 'redux-little-router'

import Location from '../boiler-ui/lib/containers/routes/Location'
import UserRedirect from '../boiler-ui/lib/containers/routes/UserRedirect'

// containers
import Login from './containers/Login'
import Register from './containers/Register'

// normal components
import Dashboard from './components/Dashboard'
import Welcome from './components/Welcome'
import Help from './components/Help'
import About from './components/About'

const routes = {
  '/': {
    page:'dashboard'
  },
  '/help': {
    page:'help'
  },
  '/about': {
    page:'about'
  },
  '/login': {
    page:'login'
  },
  '/register': {
    page:'register'
  }
}

// relative strips the basepath from the current url
const fragments = (relative) => {
  const compareRoute = (route) => (pathname) => relative(pathname) == route
  return (
    <div>

      <Location user={true} filter={compareRoute('/')}>
        <Dashboard />
      </Location>

      <Location user={false} filter={compareRoute('/')}>
        <Welcome />
      </Location>

      <UserRedirect route="/login" redirector={loggedIn => loggedIn ? '/' : null}>
        <Login />
      </UserRedirect>

      <UserRedirect route="/register" redirector={loggedIn => loggedIn ? '/' : null}>
        <Register />
      </UserRedirect>

      <Fragment forRoute="/help">
        <Help />
      </Fragment>

      <Fragment forRoute="/about">
        <About />
      </Fragment>

    </div>
  )
}

export default {
  routes,
  fragments
}