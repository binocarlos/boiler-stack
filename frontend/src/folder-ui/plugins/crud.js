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

  const widgets = {
    table:TableWidget({
      api:api.table,
      actionPrefix,
      selector:selector('table'),
      getTableFields:settings.getTableFields,
      getIcon:getIcon,
      getTitle:(state, routeInfo) => settings.pluralTitle,
      getButtons:(state, store, routeInfo, actions) => {
        return [{
          title:'Add',
          handler:() => store.dispatch(routerActions.push(route + '/add'))
        }]
      }
    }),
    form:FormWidget({
      api:api.form,
      actionPrefix,
      selector:selector('form'),
      getSchema:settings.getSchema,
      getInitialFormData:settings.getInitialFormData,
      getIcon:getIcon,
      getTitle:(state, routeInfo) => {
        return routeInfo.mode == 'add' ? 
          'New ' + settings.title :
          'Edit title'
      },
      getButtons:(state, store, routeInfo, actions) => {

        const formData = state.tools.data || {}
        const formMeta = state.tools.meta || {}
        const saveDisabled = formMeta.changed && formMeta.valid ? false : true

        return [{
          title:'Cancel',
          handler:() => store.dispatch(routerActions.push(route))
        },{
          title:'Revert',
          handler:() => store.dispatch(actions.tools.revert())
        },{
          title:'Save',
          extraProps:{ 
            primary:true,
            disabled:saveDisabled
          },
          handler:() => {
            if(!formMeta.valid) throw new Error('form is not valid - display errors')
            const action = actions[routeInfo.mode]
            if(!action) throw new Error('action for mode: ' + routeInfo.mode + ' not found')
            store.dispatch(action.request(routeInfo.params, formData))
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