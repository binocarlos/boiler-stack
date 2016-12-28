import React, { Component, PropTypes } from 'react'
import { RelativeFragment as Fragment } from 'redux-little-router'

import Login from './containers/Login'
import Register from './containers/Register'

import Home from './components/Home'
import Help from './components/Help'
import About from './components/About'

import { routeProcessor, getRoute, homeRouteMatcher } from './tools'

const routes = routeProcessor({
  '': {},
  '/': {},
  '/help': {
    title:'Help'
  },
  '/about': {
    title:'About'
  },
  '/login': {
    title:'Login',
    requireGuest: getRoute('/')
  },
  '/register': {
    title:'Register',
    requireGuest: getRoute('/')
  }
})

// relative strips the basepath from the current url
const fragments = (relative) => {
  const compareRoute = (route) => (pathname) => relative(pathname) == route
  return (
    <div>

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

    </div>
  )
}

export default {
  routes,
  fragments
}