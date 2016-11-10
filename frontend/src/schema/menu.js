import React, { Component, PropTypes } from 'react'
import MenuItem from 'material-ui/MenuItem'

import tools from './tools'

import {
  ICONS,
  TOP_LEVEL_ICONS
} from './icons'

const getIcon = (name) => {
  return ICONS[TOP_LEVEL_ICONS[name]]
}

const buildMenu = (opts, context, items = []) => {
  return (
    <div>
      {items.map((item, i) => {
        return (
          <MenuItem leftIcon={<item.icon />} key={i} onTouchTap={() => {
            if(item.path) context.click(item.path)
            context.close()
          }}>
            {item.title}
          </MenuItem>
        )
      })}
    </div>
  )
}

const appMenu = (opts, context) => {
  return buildMenu(opts, context, [{
    title:'Dashboard',
    path:'/',
    icon:getIcon('dashboard')
  },{
    title:'Projects',
    path:'/projects',
    icon:getIcon('projects')
  },{
    title:'Resources',
    path:'/resources',
    icon:getIcon('userresources')
  },{
    title:'Clients',
    path:'/clients',
    icon:getIcon('clients')
  },{
    title:'Quotes',
    path:'/quotes',
    icon:getIcon('quotes')
  },{
    title:'About',
    path:'/about',
    icon:getIcon('about')
  }])
}

const adminMenu = (opts, context) => {
  return buildMenu(opts, context, [{
    title:'Dashboard',
    path:'/',
    icon:getIcon('dashboard')
  },{
    title:'Resources',
    path:'/resources',
    icon:getIcon('userresources')
  },{
    title:'Users',
    path:'/users',
    icon:getIcon('users')
  }])
}

const menuHandlers = {
  app:appMenu,
  admin:adminMenu
}

const factory = (opts) => (context) => {
  const appid = menuHandlers[opts.appid] ? opts.appid : null
  if(!appid) return
  const handler = menuHandlers[appid]
  return handler(opts, context)
}

export default factory