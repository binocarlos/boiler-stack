import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'

import { ContainerWrapper } from '../../folder-ui/tools'

import Table from '../../folder-ui/containers/Table'
import Form from '../../folder-ui/containers/Form'

const ClientRoutes = (store, settings, auth) => {

  const TableContainer = ContainerWrapper(Table, {

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