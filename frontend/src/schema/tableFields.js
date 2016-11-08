import React, { Component, PropTypes } from 'react'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'

import getColor from './colors'

const handlers = {
  noop:(context, settings, data) => false,
  open:(context, settings, data) => {
    console.log('open')
  },
  edit:(context, settings, data) => {
    console.log('edit')
  },
  delete:(context, settings, data) => {
    console.log('delete')
  }
}

const renderers = {
  text:(opts = {}) => (context, settings) => (data) => {
    return data[opts.field]
  },
  icon:(opts = {}) => (context, settings) => (data) => {
    const icon = settings.getIcon(data)
    const color = getColor(context.theme, opts.color)
    return (
      <Avatar 
        icon={icon}
        backgroundColor={color}
        size={opts.width || 30} />
    )
  },
  button:(opts = {}) => (context, settings) => (data) => {

    const title = typeof(opts.title) == 'function' ?
      opts.title(context, settings, data) :
      opts.title

    return (
      <FlatButton 
        label={title}
        onTouchTap={(e) => {
          e.stopPropagation()
          e.preventDefault()
          opts.handler(context, settings, data)
          return false
        }} />
    )
  }
}
/*

  the table fields for the children view
  
*/

const TEXT_FIELD = (opts) => {

  opts = Object.assign({}, {
    field:'name'
  }, opts)

  return {
    title:opts.field,
    render:renderers.text(opts)
  }
}

const ICON_FIELD = (opts) => {

  opts = Object.assign({}, {
    width:30,
    color:'table'
  }, opts)

  return {
    title:opts.field,
    style:{
      width:opts.width,
      margin:0,
      padding:0
    },
    render:renderers.icon(opts)
  }
}

const BUTTON_FIELD = (opts) => {

  opts = Object.assign({}, {
    title:'button',
    width:70,
    preventRowSelection:true,
    handler:handlers.noop
  }, opts)

  return {
    title:opts.title,
    preventRowSelection:opts.preventRowSelection,
    style:{
      width:opts.width
    },
    render:renderers.button({
      title:opts.title,
      handler:opts.handler
    })
  }
}

const DEFAULT_LAYOUT = 'standard'

const getLayouts = (opts = {}) => {
  return {
    standard:[
      ICON_FIELD(),
      TEXT_FIELD(),
      BUTTON_FIELD({
        title:'Open',
        handler:handlers.open
      }),
      BUTTON_FIELD({
        title:(context, settings, data) => {
          return 'Edit'
        },
        handler:handlers.edit
      }),
      BUTTON_FIELD({
        title:'Delete',
        handler:handlers.delete
      })
    ]
  }
}

/*

  context gets:

    * parent
    * children
    * getState
    * dispatch
    * actions
  
*/
const factory = (opts = {}) => {

  const layouts = getLayouts(opts)

  return (context = {}) => {

    const layoutName = opts.getTableLayout ?
      opts.getTableLayout(context) :
      DEFAULT_LAYOUT

    const layout = layouts[layoutName] || layouts[DEFAULT_LAYOUT]

    const filteredLayout = opts.filterTableLayout ?
      opts.filterTableLayout(layout, context) :
      layout

    return filteredLayout.map(field => {
      return Object.assign({}, field, {
        render:field.render(context, opts)
      })
    })
  }
}

export default factory