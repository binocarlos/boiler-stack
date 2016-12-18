import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'

import { logout } from 'passport-slim-ui/src/actions'

const user = (store) => {
  return [{
    label:'Home',
    path:'/'
  },{
    label:'Help',
    path:'help'
  },{
    label:'About',
    path:'about'
  },{
    label:'Logout',
    handler:() => store.dispatch(logout())
  }]
}

const guest = (store) => {
  return [{
    label:'Login',
    path:'login'
  },{
    label:'Register',
    path:'register'
  },{
    label:'Help',
    path:'help'
  },{
    label:'About',
    path:'about'
  }]
}

const menus = {
  user,
  guest
}

export default menus