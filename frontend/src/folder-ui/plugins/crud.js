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

import TableController from './controller/table'
import FormController from './controller/form'

import TableWidget from './widgets/table'
import FormWidget from './widgets/form'

import CrudButtons from './buttons/crud'
import SelectButtons from './buttons/select'
import FormButtons from './buttons/form'

import {
  TableTitle,
  FormTitle
} from './tools/titles'

import {
  CombineButtons
} from './buttons/tools'

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

  // these have the sagas, actions and reducers
  const controllers = {
    table:TableController({
      label:title + ':table',
      api:api.table,
      actionPrefix
    }),
    form:FormController({
      label:title + ':form',
      api:api.form,
      actionPrefix,
      routes:{
        home:route
      }
    })
  }

  const tableActions = controllers.table.actions
  const formActions = controllers.form.actions

  // we pass actions into these buttons factories
  // because then their action types will line up
  // with the reducers in the controllers above
  const buttons = {
    table:CombineButtons({
      type:'dropdown',
      title:'Actions',
      items:[
        CrudButtons({
          route
        }),
        SelectButtons({
          actions:{
            selected:tableActions.tools.selected
          }
        })
      ]
    }),
    table:CombineButtons({
      type:'buttons',
      items:[
        FormButtons({
          route,
          actions:{
            revert:formActions.tools.revert,
            put:formActions.put.request,
            post:formActions.post.request
          }
        })
      ]
    })
  }

  // these have the containers and components
  const widgets = {
    table:TableWidget({
      selector:selector('table'),
      getTableFields:settings.getTableFields,
      getIcon:getIcon,
      getTitle:TableTitle(settings.pluralTitle),
      getButtons:buttons.table,
      actions:{
        requestData:tableActions.get.request,
        selected:tableActions.tools.selected
      }
    }),
    form:FormWidget({
      selector:selector('form'),
      getSchema:settings.getSchema,
      getInitialFormData:settings.getInitialFormData,
      getIcon:getIcon,
      getTitle:FormTitle(settings.title),
      getButtons:buttons.form,
      actions:{
        requestData:formActions.get.request,
        selected:tableActions.tools.selected
      }
    })
  }

  const getReducers = () => {
    return {
      [settings.reducerName]:combineReducers({
        table:controllers.table.reducer,
        form:controllers.form.reducer
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
    return Object.keys(controllers || {}).reduce(function(sagas, key){
      return sagas.concat(controllers[key].getSagas(store) || [])
    }, [])
  }

  return {
    getRoutes,
    getReducers,
    getSagas
  }
}

export default CrudPlugin