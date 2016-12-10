import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'

import { isUserLoggedIn } from 'passport-slim-ui/src/selectors'
import { logout } from 'passport-slim-ui/src/actions'
import { toggle_menu } from 'boiler-frontend/src/actions'

import UserMenu from 'boiler-frontend/src/components/UserMenu'
import Menu from 'boiler-frontend/src/components/Menu'

import AccountMenu from '../containers/AccountMenu'

const mapMenuItems = (items, dispatch, extrafn) => items.map(item => {
  if(item.path){
    item.handler = () => {
      dispatch(routerActions.push(item.path))
    }
  }
  if(extrafn){
    const origHandler = item.handler
    item.handler = () => {
      origHandler()
      extrafn()
    }  
  }
  return item
})


const baseUserItems = (dispatch) => {
  return [{
    label:'Help',
    path:'help'
  },{
    label:'About',
    path:'about'
  },{
    label:'Logout',
    handler:() => dispatch(logout())
  }]
}

const baseGuestItems = (dispatch) => {
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

const userAppbarMenu = (dispatch) => {
  return mapMenuItems(baseUserItems(dispatch), dispatch)
}

const guestAppbarMenu = (dispatch) => {
  return mapMenuItems(baseGuestItems(dispatch), dispatch)
}

const userMenu = (dispatch) => {
  return mapMenuItems(baseUserItems(dispatch), dispatch, () => {
    dispatch(toggle_menu(false))
  })
}

const guestMenu = (dispatch) => {
  return mapMenuItems(baseGuestItems(dispatch), dispatch, () => {
    dispatch(toggle_menu(false))
  })
}

// the content on the right-hand side of the appbar
const getAppbarContent = (store) => () => {
  const userLoggedIn = isUserLoggedIn(store.getState())
  const menuItems = userLoggedIn ?
    userAppbarMenu(store.dispatch) :
    guestAppbarMenu(store.dispatch)

  const userMenu = (
    <UserMenu
      items={menuItems}
      />
  )

  return userLoggedIn ? (
    <AccountMenu>
      {userMenu}
    </AccountMenu>
  ) : userMenu
}

// the menu options we show on the right
const getMenuContent = (store) => () => {
  const menuItems = isUserLoggedIn(store.getState()) ?
    userMenu(store.dispatch) :
    guestMenu(store.dispatch)

  return (
    <Menu
      items={menuItems}
      />
  )
}

const MenuPlugin = (settings = {}) => {

  const getSettings = () => {
    return {
      hasMenu:true,
      getAppbarContent,
      getMenuContent
    }
  }

  return {
    getSettings
  }
}

export default MenuPlugin