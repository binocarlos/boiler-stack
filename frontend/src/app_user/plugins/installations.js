import React, { Component, PropTypes } from 'react'

import Crud from '../../folder-ui/plugins/crud'
import mongoCrudAjaxFactory from '../../folder-ui/api/mongocrud'
import { open_snackbar } from 'boiler-frontend/src/actions'
import ICON from 'material-ui/svg-icons/file/cloud'
import bows from 'bows'

const TABLE_FIELDS = [{
  name:'name',
  title:'Name'
},{
  name:'littleid',
  title:'ID',
  style:{
    width:'100px'
  }
}]

const SCHEMA = [{
  name:'name'
}]

const logger = bows('installations')

const SETTINGS = {
  type:'installation',
  title:'Installation',
  url:'/api/v1/installations',
  route:'installations',
  reducerName:'installations',
  actionPrefix:'INSTALLATIONS',
  icon:ICON,
  initialFormData:{
    name:'apples'
  },
  getIcon:() => (<ICON />),
  getTableFields:(state, store, routeInfo) => TABLE_FIELDS,
  getSchema:(state, store, routeInfo) => SCHEMA,
  // react to core user events
  userEventHandler:(store, userEvent) => {
    logger('user event', userEvent)
    store.dispatch(open_snackbar(userEvent.message))
  }
}

const InstallationsPlugin = (settings = {}) => {
  settings = Object.assign({}, SETTINGS, settings)

  const ajaxApi = mongoCrudAjaxFactory({
    type:settings.type,
    title:settings.title,
    url:settings.url,

  })

  settings.api = ajaxApi

  return Crud(settings)
}

export default InstallationsPlugin