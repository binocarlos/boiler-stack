import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'

import UserMenu from '../../boiler-frontend/components/UserMenu'
import Menu from '../../boiler-frontend/components/Menu'

import AccountMenu from '../containers/AccountMenu'

import { 
  isUserLoggedIn 
} from '../../passport-slim-ui/selectors'

import { 
  logout 
} from '../../passport-slim-ui/actions'

import {
  toggle_menu
} from '../../boiler-frontend/actions'

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
const getAppbarContent = (state, dispatch) => {
  const userLoggedIn = isUserLoggedIn(state)
  const menuItems = userLoggedIn ?
    userAppbarMenu(dispatch) :
    guestAppbarMenu(dispatch)

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
const getMenuContent = (state, dispatch) => {
  const menuItems = isUserLoggedIn(state) ?
    userMenu(dispatch) :
    guestMenu(dispatch)

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