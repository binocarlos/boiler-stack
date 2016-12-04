import React, { Component, PropTypes } from 'react'
import { Route } from 'react-router'
import { push } from 'react-router-redux'

import Help from './components/Help'
import About from './components/About'

const GetUserMenu = (store, settings, auth) => {
  return [{
    label:'Help',
    linkTo:'help'
  },{
    label:'About',
    linkTo:'about'
  }]
}

export default GetUserMenu