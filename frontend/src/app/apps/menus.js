import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'
import { isUserLoggedIn } from '../../passport-slim-ui/reducers/selectors'
import { logout } from '../../passport-slim-ui/actions'
import UserMenu from '../../boiler-frontend/components/UserMenu'
import Menu from '../../boiler-frontend/components/Menu'

import {
  toggle_menu
} from '../../boiler-frontend/actions'

const mapMenuItems = (dispatch, items, extrafn) => items.map(item => {
  if(item.path){
    item.handler = () => {
      dispatch(routerActions.push(item.path))
      extrafn && extrafn()
    }
  }
  const origHandler = item.handler
  item.handler = () => {
    origHandler()
    extrafn && extrafn()
  }
  return item
})

const userAppbarMenu = (dispatch) => {
  return mapMenuItems(dispatch, [{
    label:'Help',
    path:'help'
  },{
    label:'About',
    path:'about'
  },{
    label:'Logout',
    handler:() => dispatch(logout())
  }])
}

const guestAppbarMenu = (dispatch) => {
  return mapMenuItems(dispatch, [{
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
  }])
}

const userMenu = (dispatch) => {
  return mapMenuItems(dispatch, [{
    label:'Help',
    path:'help'
  },{
    label:'About',
    path:'about'
  },{
    label:'Logout',
    handler:() => dispatch(logout())
  }], () => {
    dispatch(toggle_menu(false))
  })
}

const guestMenu = (dispatch) => {
  return mapMenuItems(dispatch, [{
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
  }], () => {
    dispatch(toggle_menu(false))
  })
}

// the content on the right-hand side of the appbar
export const getAppbarContent = (state, dispatch) => {
  const menuItems = isUserLoggedIn(state) ?
    userAppbarMenu(dispatch) :
    guestAppbarMenu(dispatch)

  return (
    <UserMenu
      items={menuItems}
      />
  )
}

// the menu options we show on the right
export const getMenuContent = (state, dispatch) => {
  const menuItems = isUserLoggedIn(state) ?
    userMenu(dispatch) :
    guestMenu(dispatch)

  return (
    <Menu
      items={menuItems}
      />
  )
}