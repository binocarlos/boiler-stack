import bows from 'bows'

import { open_snackbar } from 'boiler-frontend/src/actions'
import Crud from './plugins/crud'

import mongoCrudFactory from '../folder-ui/api/mongocrud'
import mongoEndpointFactory from '../folder-ui/api/mongoendpoint'

const apis = {
  mongocrud:mongoCrudFactory,
  mongoendpoint:mongoEndpointFactory
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

export const ApiFactory = (api = {}) => {
  const apiFactory = apis[api.type]
  if(!apiFactory) throw new Error('api not found: ' + api.type)
  return apiFactory(api.settings)
}

export const PluginFactory = (plugin = {}, api) => {
  const pluginFactory = plugins[plugin.type]
  if(!pluginFactory) throw new Error('plugin not found: ' + plugin.type)
  const pluginSettings = Object.assign({}, plugin.settings, {
    api,
    userEventHandler:userEventHandler(plugin.id)
  })
  return pluginFactory(pluginSettings)
}

export const PluginsFactory = (sections = []) => {
  return sections.map(section => PluginFactory(section.plugin, ApiFactory(section.api)))
}