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

import { getUserData } from 'passport-slim-ui/src/selectors'

import {
  PluginsFactory,
  ApiFactory,
  userEventHandler
} from '../tools'

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

  const sectionPlugins = PluginsFactory(config.sections)
  const sections = {}
  sectionPlugins.forEach(plugin => {
    sections[plugin.settings.id] = plugin
  })

  const installationTable = sections.installation.controllers.table
  const installationConfig = config.settings.installation

  const currentUserPlugin = CurrentUser({
    url:config.core.currentUserURL,
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
      userSelector:getUserData,
      switchInstallation:installationMenuPlugin.actions.switch,
      installationRoute:installationConfig.route,
      editInstallations:() => routerActions.push(installationConfig.route),
      loadInititalData:installationTable.actions.get.request
    })
  })

  const basePlugins = [
    Core(config.core),
    Menus(menuConfig),
    Routes(config.routes),
    Passport({
      appURL:config.core.appURL
    }),
    Snackbar(),
    currentUserPlugin,
    installationMenuPlugin
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