import bows from 'bows'

import { open_snackbar } from 'boiler-frontend/src/actions'
import Crud from '../plugins/crud'

import mongoCrudAjaxFactory from '../../folder-ui/api/mongocrud'

const apis = {
  mongocrud:mongoCrudAjaxFactory
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

export const PluginFactory = (sections = []) => {
  return sections.map(section => {
    const apiFactory = apis[section.api.type]
    const pluginFactory = plugins[section.plugin.type]
    if(!apiFactory) throw new Error('api not found: ' + section.api.type)
    if(!pluginFactory) throw new Error('plugin not found: ' + section.plugin.type)

    const api = apiFactory(section.api.settings)
    const pluginSettings = Object.assign({}, section.plugin.settings, {
      api,
      userEventHandler:userEventHandler(section.id)
    })
    return pluginFactory(pluginSettings)
  })
}