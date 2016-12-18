import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'

import { isUserLoggedIn } from 'passport-slim-ui/src/selectors'
import { logout } from 'passport-slim-ui/src/actions'
import { toggle_menu } from 'boiler-frontend/src/actions'

import UserMenu from 'boiler-frontend/src/components/UserMenu'
import Menu from 'boiler-frontend/src/components/Menu'

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

const appbarMenu = (store, getItems) => {
  return mapMenuItems(getItems(store), store.dispatch)
}

const menu = (store, getItems) => {
  return mapMenuItems(getItems(store), store.dispatch, () => {
    store.dispatch(toggle_menu(false))
  })
}

// the content on the right-hand side of the appbar
const getAppbarContent = settings => store => () => {
  const userLoggedIn = isUserLoggedIn(store.getState())
  const menuItems = userLoggedIn ?
    appbarMenu(store, settings.user) :
    appbarMenu(store, settings.guest)

  const userMenu = (
    <UserMenu
      items={menuItems}
      />
  )

  return settings.appbarWrapper && userLoggedIn ? (
    <settings.appbarWrapper>
      {userMenu}
    </settings.appbarWrapper>
  ) : userMenu
}

// the menu options we show on the right
const getMenuContent = settings => store => () => {
  const menuItems = isUserLoggedIn(store.getState()) ?
    menu(store, settings.user) :
    menu(store, settings.guest)

  return (
    <Menu
      items={menuItems}
      />
  )
}

const MenuPlugin = (settings = {}) => {

  if(!settings.user) throw new Error('user setting required')
  if(!settings.guest) throw new Error('guest setting required')

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