import React, { Component, PropTypes } from 'react'
import deepCheck from 'deep-check-error'
import InstallationMenu from '../containers/InstallationMenu'
import Menus from './Menus'

const REQUIRED_SETTINGS = [
  'title',
  'selector',
  'installationsRoute',
  'menuConfig',
  'actions.switch',
  'actions.redirect',
  'actions.requestData'
]

const InstallationMenuPlugin = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const title = settings.title
  const pluralTitle = settings.pluralTitle || settings.title + 's'
  const menuConfig = settings.menuConfig
  const installationsRoute = settings.installationsRoute
  const selector = settings.selector
  const actions = settings.actions

  // inject appbarWrapper
  menuConfig = Object.assign({}, menuConfig, {
    appbarWrapper:ContainerWrapper(InstallationMenu, {
      chooseTitle:'choose ' + title.toLowerCase(),
      editTitle:'edit ' + pluralTitle.toLowerCase(),
      selector:selector,
      switchInstallation:actions.switch,
      installationRoute:installationsRoute,
      editInstallations:() => actions.redirect(installationsRoute),
      loadInititalData:actions.requestData
    })
  })

  return Menus(menuConfig)
}

export default InstallationMenuPlugin