import React, { Component, PropTypes } from 'react'
import {
  ContainerWrapper
} from '../folder-ui/tools'

import PassportPlugin from 'passport-slim-ui/src/plugin'
import SnackbarPlugin from 'boiler-frontend/src/plugins/snackbar'
import CorePlugin from '../boiler-ui/plugins/core'
import MenuPlugin from '../boiler-ui/plugins/menus'

import core from './config/core'
import pages from './config/pages'
import menus from './config/menus'

import actions from './actions'
import selectors from './selectors'

import InstallationMenu from '../boiler-ui/components/InstallationMenu'

const installationPage = pages.installation

menus.appbarWrapper = ContainerWrapper(InstallationMenu, {

  initialize: (dispatch, ownProps) => {
    console.log('-------------------------------------------');
    console.log('load installation menu initial data')
  },

  getState: (state) => {
    return {
      currentItem: selectors.installation.current(state),
      items: selectors.installation.items(state),
      chooseTitle: 'choose ' + installationPage.title.toLowerCase(),
      editTitle: 'edit ' + installationPage.pluralTitle.toLowerCase(),
      installationRoute: installationPage.route,
    }
  },

  injectProps: (dispatch, ownProps) => {
    return {
      editInstallations: (currentPath) => {
        if(currentPath == installationPage.route) return
        dispatch(actions.router.redirect(installationPage.route))
      },
      changeInstallation: (id) => {
        console.log('-------------------------------------------');
        console.log('change installation: ' + id)
      }
    }
  }
 
})

const plugins = [
  CorePlugin(core),
  PassportPlugin({
    appURL:core.appURL
  }),
  SnackbarPlugin(),
  MenuPlugin(menus)
]

export default plugins