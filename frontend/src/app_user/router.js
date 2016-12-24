import React, { Component, PropTypes } from 'react'
import { RelativeFragment as Fragment } from 'redux-little-router'
import LocationFilter from '../boiler-ui/lib/containers/LocationFilter'
import { processRoutes } from '../boiler-ui/lib/tools'

import Dashboard from './components/Dashboard'
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
  }
}

const fragments = (relative) => {
  return (
    <div>
      <LocationFilter filter={pathname => relative(pathname) == '/'}>
        <Dashboard />
      </LocationFilter>
      <Fragment forRoute='/help'>
        <Help />
      </Fragment>
      <Fragment forRoute='/about'>
        <About />
      </Fragment>
    </div>
  )
}

export default {
  routes,
  fragments
}