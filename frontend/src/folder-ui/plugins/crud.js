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

import Ajax from '../api/ajax'

const REQUIRED_SETTINGS = [
  'route',
  'reducerName',
  'actionPrefix',
  'api',
  'getTitle',
  'getTableFields',
  'getSchema'
]

const CrudPlugin = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  if(!settings.plural_title) settings.plural_title = settings.title + 's'

  const api = settings.api
  const route = settings.route
  const reducerName = settings.reducerName
  const actionPrefix = settings.actionPrefix
  const selector = (widget) => (state) => state[reducerName][widget]

  const getTitle = (widget) => (state, routeInfo) => {
    routeInfo.widget = widget
    return settings.getTitle(state, routeInfo)
  }

  const widgets = {
    table:TableWidget({
      loadData:api.loadTableData,
      actionPrefix,
      selector:selector('table'),
      getTitle:getTitle('table'),
      getTableFields:settings.getTableFields,
      getButtons:(state, store, routeInfo, actions) => {
        return [{
          title:'Add',
          handler:() => store.dispatch(routerActions.push(route + '/add'))
        }]
      }
    }),
    form:FormWidget({
      actionPrefix,
      selector:selector('form'),
      getTitle:getTitle('form'),
      getSchema:settings.getSchema,
      getButtons:(state, store, routeInfo, actions) => {
        return [{
          title:'Cancel',
          handler:() => store.dispatch(routerActions.push(route))
        },{
          title:'Revert',
          handler:() => store.dispatch(actions.tools.revert())
        },{
          title:'Save',
          extraProps:{ 
            primary:true
          },
          handler:() => {
            console.log('-------------------------------------------');
            console.log('save')
          }
        }]
      }
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
    const EditContainer = widgets.form.getContainer(store, 'edit')
    const AddContainer = widgets.form.getContainer(store, 'add')

    return (
      <Route path={route}>
        <IndexRoute component={TableContainer} />
        <Route path="edit/:id" components={EditContainer} />
        <Route path="add" components={AddContainer} />
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