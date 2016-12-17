import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'

import { isUserLoggedIn } from 'passport-slim-ui/src/selectors'
import { logout } from 'passport-slim-ui/src/actions'
import { toggle_menu } from 'boiler-frontend/src/actions'

import UserMenu from 'boiler-frontend/src/components/UserMenu'
import Menu from 'boiler-frontend/src/components/Menu'

import InstallationMenu from '../containers/InstallationMenu'

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


const baseUserItems = (store) => {
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

const baseGuestItems = (store) => {
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

const userAppbarMenu = (store) => {
  return mapMenuItems(baseUserItems(store), store.dispatch)
}

const guestAppbarMenu = (store) => {
  return mapMenuItems(baseGuestItems(store), store.dispatch)
}

const userMenu = (store) => {
  return mapMenuItems(baseUserItems(store), store.dispatch, () => {
    store.dispatch(toggle_menu(false))
  })
}

const guestMenu = (store) => {
  return mapMenuItems(baseGuestItems(store), store.dispatch, () => {
    store.dispatch(toggle_menu(false))
  })
}

// the content on the right-hand side of the appbar
const getAppbarContent = settings => store => () => {
  const userLoggedIn = isUserLoggedIn(store.getState())
  const menuItems = userLoggedIn ?
    userAppbarMenu(store) :
    guestAppbarMenu(store)

  const userMenu = (
    <UserMenu
      items={menuItems}
      />
  )

  return userLoggedIn ? (
    <InstallationMenu>
      {userMenu}
    </InstallationMenu>
  ) : userMenu
}

// the menu options we show on the right
const getMenuContent = settings => store => () => {
  const menuItems = isUserLoggedIn(store.getState()) ?
    userMenu(store) :
    guestMenu(store)

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
      getAppbarContent:getAppbarContent(settings),
      getMenuContent:getMenuContent(settings)
    }
  }

  return {
    getSettings
  }
}

export default MenuPlugin