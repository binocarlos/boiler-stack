import React, { Component, PropTypes } from 'react'

import Crud from '../../folder-ui/plugins/crud'
import mongoCrudAjaxFactory from '../../folder-ui/api/mongocrud'

import ICON from 'material-ui/svg-icons/file/cloud'

const TABLE_FIELDS = [{
  name:'littleid',
  title:'ID',
  style:{
    width:'100px'
  }
},{
  name:'name',
  title:'Name'
}]

const SCHEMA = [{
  name:'name'
}]

const SETTINGS = {
  type:'installation',
  title:'Installation',
  url:'/api/v1/installations',
  route:'installations',
  reducerName:'installations',
  actionPrefix:'INSTALLATIONS',
  icon:ICON,
  initialFormData:{},
  getIcon:() => (<ICON />),
  getTableFields:(state, store, routeInfo) => TABLE_FIELDS,
  getSchema:(state, store, routeInfo) => SCHEMA
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