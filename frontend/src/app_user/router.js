import React, { Component, PropTypes } from 'react'
import { RelativeFragment as Fragment } from 'redux-little-router'

import Location from '../boiler-ui/lib/containers/routes/Location'
import UserFilter from '../boiler-ui/lib/containers/routes/UserFilter'

// containers
import Login from './containers/Login'
import Register from './containers/Register'

// normal components
import Home from './components/Home'
import Help from './components/Help'
import About from './components/About'

const routes = {
  '/': {
    title:''
  },
  '/help': {
    title:'Help'
  },
  '/about': {
    title:'About'
  },
  '/login': {
    title:'Login'
  },
  '/register': {
    title:'Register'
  }
}

// relative strips the basepath from the current url
const fragments = (relative) => {
  const compareRoute = (route) => (pathname) => relative(pathname) == route
  return (
    <div>

      <Location filter={compareRoute('/')}>
        <Home />
      </Location>

      <Fragment forRoute="/login">
        <Login />
      </Fragment>

      <Fragment forRoute="/register">
        <Register />
      </Fragment>

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