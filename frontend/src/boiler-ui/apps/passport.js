import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'
import Passport from 'passport-slim-ui/src/plugin'
import Snackbar from 'boiler-frontend/src/plugins/snackbar'
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
  'menus',
  'plugins',
  'core',
  'installationController',
  'installationConfig',
  'routes'
]

const PassportAppTemplate = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  const installationController = settings.installationController
  const installationConfig = settings.installationConfig
  const core = settings.core


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
    Core(config.core),
    Menus(menuConfig),
    Routes(config.routes),
    Passport({
      appURL:config.core.appURL
    }),
    Snackbar(),
    currentUserPlugin,
    installationMenuPlugin
  ].concat(settings.plugins)
}

export default PassportAppTemplate