import React, { Component, PropTypes } from 'react'
import Avatar from 'material-ui/Avatar'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'

import COLORS from './colors'

const renderers = {
  text:(fieldname) => (context) => (data) => {
    return data[fieldname]
  },
  icon:(size) => (context, opts) => (data) => {
    const icon = opts.getIcon(data, 'table', context.theme)
    return (
      <Avatar 
        icon={icon}
        backgroundColor={COLORS.main}
        size={size || 30} />
    )
  }
}
/*

  the table fields for the children view
  
*/
const NAME_FIELD = {
  title:'name',
  render:renderers.text('name')
}

const ICON_FIELD = {
  title:'icon',
  style:{
    width:30,
    margin:0,
    padding:0
  },
  render:renderers.icon(30)
}

const LAYOUTS = {
  standard:[
    ICON_FIELD,
    NAME_FIELD
  ]
}


/*

  context gets:

    * parent
    * children
    * getState
    * dispatch
    * actions
  
*/
const factory = (opts = {}) => (context = {}) => {

  let layout = opts.getLayout ?
    opts.getLayout(context) :
    LAYOUTS.standard

  layout = opts.filterLayout ?
    opts.filterLayout(layout, context) :
    layout

  return layout.map(field => {
    return Object.assign({}, field, {
      render:field.render(context, opts)
    })
  })
}

export default factory