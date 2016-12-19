import React, { Component, PropTypes } from 'react'
import { combineReducers } from 'redux'
import deepCheck from 'deep-check-error'

import FormController from './form'
import TableController from './table'

const REQUIRED_SETTINGS = [
  'id',
  'title',
  'route',
  'actionPrefix',
  'initialFormData',
  'api.list',
  'api.get',
  'api.post',
  'api.put'
]

const CrudController = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  if(!settings.pluralTitle) settings.pluralTitle = settings.title + 's'

  const id = settings.id
  const title = settings.title
  const pluralTitle = settings.pluralTitle || settings.title + 's'
  const api = settings.api
  const route = settings.route
  const actionPrefix = settings.actionPrefix
  const selector = (widget) => (state) => state[id][widget]

  /*
  
    controllers
    
  */
  const table = TableController({
    id:id + '_table',
    selector:selector('table'),
    title,
    pluralTitle,
    userEventHandler:settings.userEventHandler,
    actionPrefix:actionPrefix + '_TABLE',
    api:{
      list:api.list,
      delete:api.delete
    }
  })

  const form = FormController({
    id:id + '_form',
    selector:selector('form'),
    title,
    userEventHandler:settings.userEventHandler,
    initialFormData:settings.initialFormData,    
    actionPrefix:actionPrefix + '_FORM',
    redirects:{
      home:route
    },
    api:{
      get:api.get,
      post:api.post,
      put:api.put
    }
  })

  /*
  
    factories
    
  */
  const getReducer = () => {
    return combineReducers({
      table:table.getReducer(),
      form:form.getReducer()
    })
  }

  const getState = (state) => {
    return {
      table:table.getState(state),
      form:form.getState(state)
    }
  }

  const getSagas = (store) => {
    return table.getSagas(store).concat(form.getSagas(store))
  }

  return {
    id,
    form,
    table,
    getReducer,
    getState,
    getSagas
  }

}

export default CrudController