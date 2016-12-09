import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import { routerActions } from 'react-router-redux'
import { combineReducers } from 'redux'

import ApiSaga from '../folder-ui/sagas/api'
import { ApiActions, TableActions, FormActions } from '../folder-ui/actions'
import TableReducer from '../folder-ui/reducers/table'
import FormReducer from '../folder-ui/reducers/form'
import ApiReducer from '../folder-ui/reducers/api'
import { ContainerWrapper } from '../folder-ui/tools'

import ToolbarContent from '../folder-ui/containers/ToolbarContent'
import Table from '../folder-ui/components/Table'
import Form from '../folder-ui/components/Form'

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

  const tableActions = {
    load:ApiActions(actionPrefix + '_TABLE_LOAD'),
    table:TableActions(actionPrefix + '_TABLE')
  }

  const formActions = {
    load:ApiActions(actionPrefix + '_FORM_LOAD'),
    add:ApiActions(actionPrefix + '_FORM_ADD'),
    save:ApiActions(actionPrefix + '_FORM_SAVE'),
    biro:FormActions(actionPrefix + '_BIRO')
  }

  const getReducers = () => {
    return {
      [settings.reducerName]:combineReducers({
        table:combineReducers({
          load:ApiReducer(tableActions.load.types),
          table:ApiReducer(tableActions.load.types)
        }),
        form:combineReducers({
          load:ApiReducer(formActions.load.types),
          add:ApiReducer(formActions.add.types),
          save:ApiReducer(formActions.save.types),
          biro:ApiReducer(formActions.biro.types)
        })
      })
    }
  }

  const selector = (state) => {
    return state[settings.reducerName]
  }

  const TableContainerFactory = (store) => ContainerWrapper(ToolbarContent, {
    ContentComponent:Table,
    initialize:(routeInfo) => {
      store.dispatch(tableActions.load.request(/* query, data */))
    },
    getProps:(routeInfo) => {
      const state = selector(store.getState())
      return {

        // table props
        toolbar:{
          title:settings.title + 's',
          buttons:[{
            title:'Add',
            handler:() => store.dispatch(routerActions.push(route + '/add'))
          }]
        },

        content:{
          data:state.table.load.data,
          fields:[{
            name:'littleid',
            title:'ID'
          },{
            name:'name',
            title:'Name'
          }],
          onRowSelection:(idArray) => {
      
          }
        }
        
      }
    }
  })

  const FormContainerFactory = (store, mode) => ContainerWrapper(ToolbarContent, {
    ContentComponent:Form,
    initialize:(routeInfo) => {
      // do we need to load the form data?
      if(routeInfo.path == 'edit' && routeInfo.params.id){

      }

    },
    getProps:(routeInfo) => {
      const state = selector(store.getState())
      return {

        // table props
        toolbar:{
          title:settings.title + 's',
          buttons:[{
            title:'Cancel',
            handler:() => store.dispatch(routerActions.push(route))
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
        },

        content:{
          data:state.form.biro.data,
          meta:state.form.biro.meta
        }
        
      }
    }
  })

  const getRoutes = (store, context) => {
    const TableContainer = TableContainerFactory(store)
    const EditContainer = FormContainerFactory(store, 'edit')
    const AddContainer = FormContainerFactory(store, 'add')

    return (
      <Route path={route}>
        <IndexRoute component={TableContainer} />
        <Route path="edit/:id" components={EditContainer} />
        <Route path="add" components={AddContainer} />
      </Route>
    )
  }

  const getSagas = (store) => {

    const api = Ajax({
      name:settings.title
    })

    // load the table data
    const tableApiSaga = ApiSaga({
      actions:tableActions.load,
      trigger:tableActions.load.types.REQUEST,
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