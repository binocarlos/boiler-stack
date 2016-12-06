import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'

import { ContainerWrapper } from '../../folder-ui/tools'

import Collection from '../../folder-ui/containers/Collection'
import Form from '../../folder-ui/containers/Form'

const ClientRoutes = (store, settings, auth) => {

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
      
    }
  })

  const FormContainer = ContainerWrapper(Form, {

  })
  
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

export default ClientRoutes