import React, { Component, PropTypes } from 'react'
import MenuItem from 'material-ui/MenuItem'

import tools from './tools'

const buildMenu = (opts, context, items = []) => {
  return (
    <div>
      {items.map((item, i) => {
        return (
          <MenuItem key={i} onTouchTap={() => {
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
    path:'/'
  },{
    title:'Projects',
    path:'/projects'
  },{
    title:'Resources',
    path:'/resources/apples'
  },{
    title:'About',
    path:'/about'
  }])
}

const adminMenu = (opts, context) => {
  return buildMenu(opts, context, [{
    title:'Dashboard',
    path:'/'
  },{
    title:'Resources',
    path:'/resources/core'
  },{
    title:'Users',
    path:'/users'
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