import React, { Component } from 'react'
import { RelativeFragment as Fragment } from 'redux-little-router'

import Dashboard from '../components/Dashboard'
import Help from '../components/Help'
import About from '../components/About'

export const routes = {
  '/about': {},
  '/help': {}
}

export class Routes extends Component {
  render() {
    return (
      <Fragment>
        <Fragment forRoute='/'>
          <Dashboard />
        </Fragment>
        <Fragment forRoute='/help'>
          <Help />
        </Fragment>
        <Fragment forRoute='/about'>
          <About />
        </Fragment>
      </Fragment>
    )
  }
}