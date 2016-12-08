import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import { routerActions } from 'react-router-redux'
import { combineReducers } from 'redux'

import ApiSaga from '../folder-ui/sagas/api'
import { ApiActions, TableActions } from '../folder-ui/actions'
import TableReducer from '../folder-ui/reducers/table'
import ApiReducer from '../folder-ui/reducers/api'
import { ContainerWrapper } from '../folder-ui/tools'

import Collection from '../folder-ui/containers/Collection'
import Form from '../folder-ui/containers/Form'

import MongoCodec from '../api/mongocodec'
import Ajax from '../folder-ui/api/ajax'

const REQUIRED_SETTINGS = [
  'title',
  'apiUrl',
  'route',
  'reducerName',
  'actionPrefix'
]

const CrudPlugin = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  const baseURL = settings.apiUrl
  const route = settings.route
  const actionPrefix = settings.actionPrefix

  const tableApiActions = ApiActions(actionPrefix + '_TABLE')
  const tableActions = TableActions(actionPrefix + '_TABLE')

  const tableApiReducer = ApiReducer(tableApiActions.types)
  const tableReducer = TableReducer(tableActions.types)
  
  const TableContainerFactory = (store) => ContainerWrapper(Collection, {
    selector:(state) => {
      return {
        data:[],
        selected:[],
        parent:{}
      }
    },
    getTableFields:(parent, data) => {
      return []
    },
    onRowSelection:(idArray) => {
      
    },
    requestInitialData:() => {
      store.dispatch(tableApiActions.request(/* query, data */))
    },
    getToolbarProps:() => {
      return {
        title:settings.title + 's',
        buttons:[{
          title:'Add',
          handler:() => store.dispatch(routerActions.push(route + '/add'))
        }]
      }
    },
    getTableProps:() => {

    }
  })

  const FormContainerFactory = (store) => ContainerWrapper(Form, {

  })

  const getRoutes = (store, context) => {
    const TableContainer = TableContainerFactory(store)
    const FormContainer = FormContainerFactory(store)

    return (
      <Route path={route}>
        <IndexRoute component={TableContainer} />
        <Route path="edit/:id" components={FormContainer} />
        <Route path="add" components={FormContainer} />
      </Route>
    )
  }

  const getReducers = () => {
    return {
      [settings.reducerName]:combineReducers({
        api:tableApiReducer,
        table:tableReducer
      })
    }
  }

  const getSagas = (store) => {

    const api = Ajax({
      name:settings.title
    })

    // load the table data
    const tableApiSaga = ApiSaga({
      actions:tableApiActions,
      trigger:tableApiActions.types.REQUEST,
      handler:(action) => {
        return api
          .get(baseURL)
          .then(data => {
            return settings.codec ?
              data.map(settings.codec.encode) :
              data
          })
      }
    })

    return [
      tableApiSaga
    ]
  }

  return {
    getRoutes,
    getReducers,
    getSagas
  }
}

export default CrudPlugin