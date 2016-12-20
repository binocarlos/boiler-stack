import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'
import deepCheck from 'deep-check-error'
import Passport from '../../../passport-slim-ui/lib/plugin'
import Snackbar from '../../../boiler-frontend/lib/plugins/snackbar'

import Core from '../plugins/core'
import Menus from '../plugins/menus'
import Routes from '../plugins/routes'
import CurrentUser from '../plugins/currentuser'

import InstallationMenuPlugin from '../plugins/installationmenu'
import InstallationMenu from '../containers/InstallationMenu'

import { ContainerWrapper } from '../../folder-ui/tools'
import { currentInstallation } from '../selectors'
import { userEventHandler } from '../tools'

const REQUIRED_SETTINGS = [
  'sectionConfig',
  'menus',
  'core',
  'routes'
]

const reduceSections = (sections = [], field) => {
  return sections.reduce((ret, section) => {
    return Object.assign({}, ret, {
      [section.id]:section[field]
    }, {})
  })
}

const getControllers = (sections = []) => {
  return reduceSections(sections, 'controller')
}

const getConfigs = (sections = []) => {
  return reduceSections(sections, 'config')
}

const getPlugins = (sections = []) => {
  return sections.map(section => section.plugin)
}

const PassportAppTemplate = (settings = {}, sections = []) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const core = settings.core
  const routes = settings.routes
  
  const plugins = getPlugins(sections)
  const controllers = getControllers(sections)
  const configs = getConfigs(sections)

  if(!configs.installation) throw new Error('installation config needed')
  if(!controllers.installation) throw new Error('installation controller needed')

  const installationConfig = configs.installation
  const installationController = controllers.installation
  const installationTable = installationController.table

  const currentUserPlugin = CurrentUser({
    url:core.currentUserURL,
    userEventHandler:userEventHandler('updateuser')
  })

  const installationMenuPlugin = InstallationMenuPlugin({
    message:'Switched ' + installationConfig.title,
    saveUser:currentUserPlugin.actions.put.request
  })
  
  // inject the installation menu alongside the appbar menu
  const menuConfig = Object.assign({}, config.menus, {
    appbarWrapper:ContainerWrapper(InstallationMenu, {
      chooseTitle:'choose company',
      editTitle:'edit companies',
      dataSelector:installationTable.getState,
      currentSelector:currentInstallation,
      switchInstallation:installationMenuPlugin.actions.switch,
      installationRoute:installationConfig.route,
      editInstallations:() => routerActions.push(installationConfig.route),
      loadInititalData:installationTable.actions.get.request
    })
  })

  return [
    Core(core),
    Menus(menuConfig),
    Routes(routes),
    Passport({
      appURL:core.appURL
    }),
    Snackbar(),
    currentUserPlugin,
    installationMenuPlugin
  ].concat(plugins)
}

export default PassportAppTemplate