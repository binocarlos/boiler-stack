import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import { routerActions } from 'react-router-redux'
import { combineReducers } from 'redux'

import ApiSaga from '../sagas/api'

import { ApiActions, TableActions, FormActions } from '../actions'

import ApiReducer from '../reducers/api'
import TableReducer from '../reducers/table'
import FormReducer from '../reducers/form'

import { ContainerWrapper } from '../tools'

import ToolbarContent from '../containers/ToolbarContent'
import Table from '../components/Table'
import Form from '../components/Form'

import TableWidget from './widgets/table'
import FormWidget from './widgets/form'

import CrudTableToolbar from './toolbars/crudtable'
import FormToolbar from './toolbars/form'

const REQUIRED_SETTINGS = [
  'title',
  'route',
  'reducerName',
  'actionPrefix',
  'getTableFields',
  'getSchema',
  'api'
]

const REQUIRED_API_SETTINGS = [
  'table',
  'form'
]

const CrudPlugin = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  REQUIRED_API_SETTINGS.forEach(field => {
    if(!settings.api[field]) throw new Error(field + ' api method needed')
  })

  if(!settings.pluralTitle) settings.pluralTitle = settings.title + 's'

  const title = settings.title
  const pluralTitle = settings.pluralTitle || settings.title + 's'
  const api = settings.api
  const route = settings.route
  const reducerName = settings.reducerName
  const actionPrefix = settings.actionPrefix
  const selector = (widget) => (state) => state[reducerName][widget]

  const getIcon = () => {
    return settings.getIcon ?
      settings.getIcon() :
      null
  }

  const toolbars = {
    table:CrudTableToolbar({
      title,
      pluralTitle,
      route
    }),
    form:FormToolbar({
      title,
      pluralTitle,
      route
    })
  }

  const widgets = {
    table:TableWidget({
      route:route,
      label:title + ':table',
      api:api.table,
      actionPrefix,
      selector:selector('table'),
      getTableFields:settings.getTableFields,
      getIcon:getIcon,
      getTitle:toolbars.table.getTitle,
      getButtons:toolbars.table.getButtons
    }),
    form:FormWidget({
      route:route,
      label:title + ':form',
      api:api.form,
      actionPrefix,
      selector:selector('form'),
      getSchema:settings.getSchema,
      getInitialFormData:settings.getInitialFormData,
      getIcon:getIcon,
      getTitle:toolbars.form.getTitle,
      getButtons:toolbars.form.getButtons
    })
  }

  const getReducers = () => {
    return {
      [settings.reducerName]:combineReducers({
        table:widgets.table.reducer,
        form:widgets.form.reducer
      })
    }
  }

  const getRoutes = (store, context) => {
    const TableContainer = widgets.table.getContainer(store)
    const EditContainer = widgets.form.getContainer(store, 'put')
    const AddContainer = widgets.form.getContainer(store, 'post')

    return (
      <Route path={route}>
        <IndexRoute component={TableContainer} />
        <Route path="edit/:id" component={EditContainer} />
        <Route path="add" component={AddContainer} />
      </Route>
    )
  }

  const getSagas = (store) => {
    return Object.keys(widgets || {}).reduce(function(sagas, key){
      return sagas.concat(widgets[key].getSagas(store) || [])
    }, [])
  }

  return {
    getRoutes,
    getReducers,
    getSagas
  }
}

export default CrudPlugin