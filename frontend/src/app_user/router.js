import React, { Component, PropTypes } from 'react'
import { RelativeFragment as Fragment } from 'redux-little-router'

import CORE from './config/core'
import { GetRoute, RouteProcessor, HomeRouteMatcher } from '../boiler-ui/lib/tools'

import Login from './containers/Login'
import Register from './containers/Register'

import Home from './components/Home'
import Help from './components/Help'
import About from './components/About'

// stuff to do with prepending the basepath (so the routes read nicely)
const routeProcessor = RouteProcessor(CORE.basepath)
const getRoute = GetRoute(CORE.basepath)
const homeRouteMatcher = HomeRouteMatcher(CORE.basepath)

const homeRoute = {
  title:''
}

const routes = routeProcessor({
  '': homeRoute,
  '/': homeRoute,
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