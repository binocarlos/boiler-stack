import React, { Component, PropTypes } from 'react'
import deepCheck from 'deep-check-error'
import { Route, IndexRoute } from 'react-router'
import { routerActions } from 'react-router-redux'

import ConfirmDialog from '../../kettle-ui/ConfirmDialog'

import { ContainerWrapper } from '../tools'
import ToolbarContent from '../containers/ToolbarContent'

import TableWidget from './widgets/table'
import FormWidget from './widgets/form'

import { CombineButtons } from './buttons/tools'
import CrudButtons from './buttons/crud'
import SelectButtons from './buttons/select'
import FormButtons from './buttons/form'

const REQUIRED_SETTINGS = [
  'title',
  'route',
  'getTableFields',
  'getSchema',
  'controller'
]

const CrudPlugin = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const controller = settings.controller
  const title = settings.title
  const pluralTitle = settings.pluralTitle || settings.title + 's'
  const route = settings.route
  const getIcon = () => settings.getIcon ? settings.getIcon() : null

  const { table, form } = controller

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
        redirect:routerActions.push,
        delete:table.actions.confirmDelete.open
      }
    }),
    select:SelectButtons({
      actions:{
        redirect:routerActions.push,
        selected:table.actions.meta.selected
      }
    }),
    form:FormButtons({
      route,
      actions:{
        redirect:routerActions.push,
        revert:form.actions.meta.revert,
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
      selected:table.actions.meta.selected
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
      requestInitialData:form.actions.meta.requestInitialData,
      update:form.actions.meta.update
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

  return {
    id:controller.id,
    getReducer:controller.getReducer,
    getSagas:controller.getSagas,
    getRoutes
  }
}

export default CrudPlugin