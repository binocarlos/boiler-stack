import Passport from 'passport-slim-ui/src/plugin'
import Snackbar from 'boiler-frontend/src/plugins/snackbar'
import Core from '../plugins/core'
import Menus from '../plugins/menus'
import Routes from '../plugins/routes'

import InstallationMenu from '../plugins/installationmenu'

import { 
  PluginFactory,
  userEventHandler
} from './tools'

const REQUIRED_SETTINGS = [
  'core',
  'menus',
  'sections',
  'routes'
]

const PassportAppTemplate = (config = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!config[field]) throw new Error(field + ' setting needed')
  })

  const sectionPlugins = PluginFactory(config.sections)
  const sections = {}
  sectionPlugins.forEach(plugin => {
    sections[plugin.settings.id] = plugin
  })

  console.log('-------------------------------------------');
  console.log('-------------------------------------------');
  console.dir(sections)

  const basePlugins = [
    Core(config.core),
    Menus(config.menus),
    Routes(config.routes),
    Passport({
      appURL:config.core.appURL
    }),
    Snackbar(),
    InstallationMenu({
      action:sections.installation.controllers.table.actions.get.request,
      selector:(state) => sections.installation.controllers.table.getState(state)
    })
  ]

  const extraPlugins = config.getPlugins ?
    config.getPlugins({
      userEventHandler,
      sections
    }) :
    []

  return [
    basePlugins,
    sectionPlugins,
    extraPlugins
  ].reduce((allPlugins, list) => {
    return allPlugins.concat(list)
  }, [])
}

export default PassportAppTemplate