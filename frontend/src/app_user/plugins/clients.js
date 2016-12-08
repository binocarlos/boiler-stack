import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import { combineReducers } from 'redux'

import ApiSaga from '../../folder-ui/sagas/api'
import { ApiActions, TableActions } from '../../folder-ui/actions'
import TableReducer from '../../folder-ui/reducers/table'
import ApiReducer from '../../folder-ui/reducers/api'
import { ContainerWrapper } from '../../folder-ui/tools'

import Collection from '../../folder-ui/containers/Collection'
import Form from '../../folder-ui/containers/Form'

const ClientPlugin = (settings) => {

  const tableApiActions = ApiActions('CLIENTS_TABLE')
  const tableActions = TableActions('CLIENTS_TABLE')

  const tableApiReducer = ApiReducer(tableApiActions.types)
  const tableReducer = ApiReducer(tableActions.types)
  
  const TableContainer = ContainerWrapper(Collection, {
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
    onRowSelection:(dispatch, idArray) => {
      
    },
    requestInitialData:(dispatch) => {
      console.log('-------------------------------------------');
      console.log('load initial client data')
    }
  })

  const FormContainer = ContainerWrapper(Form, {

  })

  const getRoutes = (store, context) => {
    return (
      <Route path="clients">
        <IndexRoute component={TableContainer} />
        <Route path="view/:id" component={TableContainer} />
        <Route path="edit/:id" components={FormContainer} />
        <Route path="edit/:parentid/:id" components={FormContainer} />
        <Route path="add/:parentid/:type" components={FormContainer} />
      </Route>
    )
  }

  const getReducers = () => {
    return {
      clients:combineReducers({
        api:tableApiReducer,
        table:tableReducer
      })
    }
  }

  const getSagas = () => {
    const tableApiSaga = ApiSaga({
      actions:tableApiActions,
      trigger:tableApiActions.types.REQUEST,
      handler:() => {
        console.log('-------------------------------------------');
        console.log('load data for client table api')
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

export default ClientPlugin