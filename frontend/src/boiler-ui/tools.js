import bows from 'bows'

import { open_snackbar } from 'boiler-frontend/src/actions'
import Crud from './plugins/crud'

import MongoCrudFactory from '../folder-ui/api/mongocrud'
import MongoEndpointFactory from '../folder-ui/api/mongoendpoint'

import CrudController from '../folder-ui/controllers/crud'

const apis = {
  mongocrud:MongoCrudFactory,
  mongoendpoint:MongoEndpointFactory
}

const controllers = {
  crud:CrudController
}

const plugins = {
  crud:Crud
}

export const userEventHandler = (section) => {
  const logger = bows(section + ':events')
  return (store, userEvent) => {
    logger('user event', userEvent)
    if(userEvent.snackbar) store.dispatch(open_snackbar(userEvent.message))
  }
}

export const ApiFactory = (driver, settings = {}) => {
  if(typeof(driver) !== 'string') return driver
  const apiFactory = apis[driver]
  if(!apiFactory) throw new Error('api not found: ' + driver)
  return apiFactory(settings)
}

export const ControllerFactory = (driver, settings = {}) => {
  if(typeof(driver) !== 'string') return driver
  const controllerFactory = controllers[driver]
  if(!controllerFactory) throw new Error('controller not found: ' + driver)
  return controllerFactory(settings)
}

export const PluginFactory = (driver, settings = {}) => {
  if(typeof(driver) !== 'string') return driver
  const pluginFactory = plugins[driver]
  if(!pluginFactory) throw new Error('plugin not found: ' + driver)
  return pluginFactory(settings)
}

export const SectionFactory = (section = {}) => {
  const api = ApiFactory(section.drivers.api, section)

  const controller = ControllerFactory(section.drivers.controller, Object.assign({}, section, {
    api,
    userEventHandler:userEventHandler(section.id)
  }))

  const plugin = PluginFactory(section.drivers.plugin, Object.assign({}, section, {
    controller
  }))

  return {
    api,
    controller,
    plugin
  }
}

export const SectionsFactory = (sections = {}) => {
  return Object.keys(sections || {})
    .reduce((allSections, sectionId) => {
      const sectionConfig = sections[sectionId]
      const section = SectionFactory(sectionConfig)
      allSections.plugins[sectionId] = section.plugin
      allSections.pluginList.push(section.plugin)
      allSections.apis[sectionId] = section.api
      allSections.controllers[sectionId] = section.controller
      return allSections
    }, {
      pluginList:[],
      plugins:{},
      apis:{},
      controllers:{}
    })
}