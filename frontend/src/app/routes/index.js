import React, { Component, PropTypes } from 'react'
import { Route } from 'react-router'

import Help from '../components/Help'
import About from '../components/About'

import ClientRoutes from './clients'

const GetRoutes = (store, settings, auth) => {
  return (
    <Route>
      <Route path="help" component={Help} />
      <Route path="about" component={About} />
      {ClientRoutes(store, settings, auth)}
    </Route>
  )
}

export default GetRoutes