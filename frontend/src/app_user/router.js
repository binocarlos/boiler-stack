import React, { Component, PropTypes } from 'react'
import { RelativeFragment as Fragment } from 'redux-little-router'
import LocationFilter from '../boiler-ui/lib/containers/LocationFilter'
import { processRoutes } from '../boiler-ui/lib/tools'

import Home from './containers/Home'
import Help from './components/Help'
import About from './components/About'
import Login from './components/Login'

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
  }
}

const fragments = (relative) => {
  return (
    <div>
      <LocationFilter filter={pathname => relative(pathname) == '/'}>
        <Home />
      </LocationFilter>
      <Fragment forRoute='/help'>
        <Help />
      </Fragment>
      <Fragment forRoute='/about'>
        <About />
      </Fragment>
      <Fragment forRoute='/login'>
        <Login />
      </Fragment>
    </div>
  )
}

export default {
  routes,
  fragments
}