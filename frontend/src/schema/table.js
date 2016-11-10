import React, { Component, PropTypes } from 'react'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'

import { getItemCodecId, decodeID } from 'folder-ui/lib/db/composite'

import getColor from './colors'

import ProjectStatus from '../fields/ProjectStatus'

/*

  HANDLERS

  functions that are run by renderers
  they are hooked up to the folder-ui actions and have a dispatch function
  
*/
const handlers = {
  noop:(context, settings, data) => false,
  open:(context, settings, data) => {
    context.dispatch(context.actions.routeOpen(data, context.params))
  },
  edit:(context, settings, data) => {
    context.dispatch(context.actions.routeEdit(context.parent, data, context.params))
  },
  activateProject:(context, settings, data) => {
    context.dispatch(context.actions.routeEdit(context.parent, data, context.params))
  }
}

/*

  RENDERERS

  functions that return React elements to display for table fields
  
*/
const renderers = {
  text:(opts = {}) => (context, settings) => (data) => {
    const fields = typeof(opts.field) == 'string' ?
      [opts.field] :
      opts.field
    const text = fields.map(f => data[f]).join(' ')

    // allow easy selection of the text
    return (
      <span 
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
        }}>
        {text}
      </span>
    )
  },
  projectstatus:(opts = {}) => (context, settings) => (data) => {
    const id = data[opts.field]

    return (
      <ProjectStatus
        data={data}
        value={id}
        />
    )
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

    // check to see if we should display this button
    if(opts.filter && !opts.filter(data)) return null

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
  },

}
/*

  FIELDS
  fields with default configs that include renderers
  
*/

const TEXT_FIELD = (opts) => {

  opts = Object.assign({}, {
    field:'name'
  }, opts)

  return {
    title:opts.title || opts.field,
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
      handler:opts.handler,
      filter:opts.filter
    })
  }
}

const PROJECT_STATUS_FIELD = (opts) => {

  opts = Object.assign({}, {
    field:'littleid'
  }, opts)

  return {
    render:renderers.projectstatus(opts)
  }
}

/*

  LAYOUTS (these are collections of fields into one table)
  
*/
const DEFAULT_LAYOUT = 'standard'

const getLayouts = (opts = {}) => {
  return {

    /*
    
      standard layout
      
    */
    standard:[
      ICON_FIELD(),
      TEXT_FIELD(),
      BUTTON_FIELD({
        title:(context, settings, data) => {
          return 'Edit'
        },
        handler:handlers.edit,
        filter:item => opts.isEditable(item)
      }),
      BUTTON_FIELD({
        title:'Open',
        handler:handlers.open,
        filter:item => !opts.isLeaf(item)
      })
    ],

    /*
    
      users layout
      
    */
    users:[
      ICON_FIELD(),
      TEXT_FIELD({
        field:'name'
      }),
      TEXT_FIELD({
        field:'email'
      }),
      TEXT_FIELD({
        field:'accesslevel'
      }),
      BUTTON_FIELD({
        title:(context, settings, data) => {
          return 'Edit'
        },
        handler:handlers.edit,
        filter:item => opts.isEditable(item)
      })
    ],

    /*
    
      projects layout
      
    */
    projects:[
      ICON_FIELD(),
      TEXT_FIELD({
        field:'name'
      }),
      PROJECT_STATUS_FIELD(),
      BUTTON_FIELD({
        title:(context, settings, data) => {
          return 'Edit'
        },
        handler:handlers.edit,
        filter:item => opts.isEditable(item)
      })
    ]
  }
}

/*

  control which of the layouts above each database uses
  
*/
const TABLE_LAYOUTS = {
  projects:'projects',
  users:'users'
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

  const getLayout = (context = {}) => {
    if(!context.parent) return
    return TABLE_LAYOUTS[getItemCodecId(context.parent.id)]
  }

  const getFields = (context = {}) => {

    const layoutName = getLayout(context)
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

  

  return {
    getFields,
    getLayout
  }
}

export default factory