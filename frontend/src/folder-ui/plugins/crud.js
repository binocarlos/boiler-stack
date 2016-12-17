import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import { routerActions } from 'react-router-redux'
import { combineReducers } from 'redux'

import ConfirmDialog from '../../kettle-ui/ConfirmDialog'

import { ContainerWrapper } from '../tools'
import ToolbarContent from '../containers/ToolbarContent'

import RouterController from './controllers/router'
import FormController from './controllers/form'
import TableController from './controllers/table'

import TableWidget from './widgets/table'
import FormWidget from './widgets/form'

import { CombineButtons } from './buttons/tools'
import CrudButtons from './buttons/crud'
import SelectButtons from './buttons/select'
import FormButtons from './buttons/form'

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
  'list',
  'get',
  'post',
  'put'
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
  const getIcon = () => settings.getIcon ? settings.getIcon() : null

  // wrap the initial data for the form in a promise so it's a like an api call
  const getInitialData = () => {
    return new Promise((resolve, reject) => {
      resolve(settings.initialFormData || {})
    })
  }

  // an action function to display user confirmations (e.g. a Snackbar)
  const userEventHandler = settings.userEventHandler ? 
    settings.userEventHandler :
    (store, userEvent) => {}

  /*
  
    controllers
    
  */
  const router = RouterController()

  const table = TableController({
    title,
    pluralTitle,
    route,
    reducerName,
    userEventHandler,
    selector:selector('table'),
    actionPrefix,
    api:{
      list:api.list,
      delete:api.delete
    }
  })

  const form = FormController({
    title,
    route,
    reducerName,
    userEventHandler,
    selector:selector('form'),
    actionPrefix,
    redirects:{
      home:route
    },
    api:{
      get:api.get,
      post:api.post,
      put:api.put,
      getInitialData:getInitialData
    }
  })

  /*
  
    buttons
    
  */
  // we pass actions into these buttons factories
  // because then their action types will line up
  // with the reducers in the controllers above

  const buttons = {
    crud:CrudButtons({
      route,
      actions:{
        redirect:router.actions.redirect,
        delete:table.actions.confirmDelete.open
      }
    }),
    select:SelectButtons({
      actions:{
        redirect:router.actions.redirect,
        selected:table.actions.list.selected
      }
    }),
    form:FormButtons({
      route,
      actions:{
        redirect:router.actions.redirect,
        revert:form.actions.tools.revert,
        put:form.actions.put.request,
        post:form.actions.post.request
      }
    })
  }

  /*
  
    statics
    
  */
  const deleteDialog = (state, store) => {
    const count = state.selectedItems.length
    return (
      <ConfirmDialog
        onClose={() => store.dispatch(table.actions.confirmDelete.close())}
        onConfirm={() => store.dispatch(table.actions.confirmDelete.confirm(state.selected))}
        isModal={true}
        isOpen={state.dialogOpen}
      >
        Are you sure you want to delete { count } { count == 1 ? title : pluralTitle }?
      </ConfirmDialog>
    )
  }

  /*
  
    widgets
    
  */
  const tableWidget = TableWidget({
    getState:table.getState,
    getTableFields:settings.getTableFields,
    getIcon:getIcon,
    actions:{
      requestInitialData:table.actions.get.request,
      selected:table.actions.list.selected
    },
    getButtons:CombineButtons({
      type:'dropdown',
      title:'Actions',
      items:[
        buttons.crud,
        buttons.select
      ]
    }),
    getStatics:(state, store) => {
      return (
        <div>
          {deleteDialog(state, store)}
        </div>
      )
    }
  })

  const formWidget = FormWidget({
    getState:form.getState,
    getSchema:settings.getSchema,
    getInitialFormData:settings.getInitialFormData,
    getIcon:getIcon,
    actions:{
      requestInitialData:form.actions.tools.requestInitialData,
      update:form.actions.tools.update
    },
    getButtons:CombineButtons({
      type:'buttons',
      items:[
        buttons.form
      ]
    })
  })

  /*
  
    routes
    
  */
  const getRoutes = (store, context) => {
    const TableContainer = tableWidget(store)
    const EditContainer = formWidget(store, 'put')
    const AddContainer = formWidget(store, 'post')

    return (
      <Route path={route}>
        <IndexRoute component={TableContainer} />
        <Route path="edit/:id" component={EditContainer} />
        <Route path="add" component={AddContainer} />
      </Route>
    )
  }

  /*
  
    factories
    
  */
  const getReducers = () => {
    return {
      [settings.reducerName]:combineReducers({
        table:combineReducers(table.reducers),
        form:combineReducers(form.reducers)
      })
    }
  }

  const getSagas = (store) => {
    return ([
      table.sagas,
      form.sagas
    ]).reduce(function(sagas, factory){
      return sagas.concat(factory(store) || [])
    }, [])
  }

  return {
    settings,
    controllers:{
      table,
      form
    },
    getRoutes,
    getReducers,
    getSagas
  }
}

export default CrudPlugin