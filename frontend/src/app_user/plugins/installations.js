import React, { Component, PropTypes } from 'react'

import Crud from '../../folder-ui/plugins/crud'

import { open_snackbar } from 'boiler-frontend/src/actions'
import ICON from 'material-ui/svg-icons/file/cloud'

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

export const SETTINGS = {
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
  return Crud(settings)
}

export default InstallationsPlugin