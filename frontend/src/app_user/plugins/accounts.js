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

import MongoCodec from '../../api/mongocodec'
import Ajax from '../../folder-ui/api/ajax'

const AccountsPlugin = (settings = {}) => {

  const baseURL = settings.url || '/api/v1/accounts'

  const tableApiActions = ApiActions('ACCOUNT_TABLE')
  const tableActions = TableActions('ACCOUNT_TABLE')

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
    }
  })

  const FormContainerFactory = (store) => ContainerWrapper(Form, {

  })

  const getRoutes = (store, context) => {
    const TableContainer = TableContainerFactory(store)
    const FormContainer = FormContainerFactory(store)

    return (
      <Route path="accounts">
        <IndexRoute component={TableContainer} />
        <Route path="edit/:id" components={FormContainer} />
        <Route path="add/:type" components={FormContainer} />
      </Route>
    )
  }

  const getReducers = () => {
    return {
      accounts:combineReducers({
        api:tableApiReducer,
        table:tableReducer
      })
    }
  }

  const getSagas = (store) => {

    const mongoCodec = MongoCodec({
      inject:{
        _type:'account'
      }
    })

    const api = Ajax({
      name:'account-mongo'
    })

    // load the table data
    const tableApiSaga = ApiSaga({
      actions:tableApiActions,
      trigger:tableApiActions.types.REQUEST,
      handler:(action) => {
        return api
          .get(baseURL)
          .then(data => {
            return data.map(mongoCodec.encode)
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

export default AccountsPlugin