import React, { Component, PropTypes } from 'react'

import Crud from '../../folder-ui/plugins/crud'

const REQUIRED_SETTINGS = [
  'id',
  'type',
  'title',
  'url',
  'route',
  'actionPrefix',
  'icon',
  'initialFormData',
  'tableFields',
  'schema',
  'controller'
]

const CrudPlugin = (settings = {}) => {
  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })
  settings = Object.assign({}, settings, {
    getIcon:() => (<settings.icon />),
    getTableFields:(state, store, routeInfo) => settings.tableFields,
    getSchema:(state, store, routeInfo) => settings.schema
  })
  return Crud(settings)
}

export default CrudPlugin