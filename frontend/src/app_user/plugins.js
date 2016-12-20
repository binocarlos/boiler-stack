import PassportPlugin from 'passport-slim-ui/src/plugin'
import SnackbarPlugin from 'boiler-frontend/src/plugins/snackbar'
import CorePlugin from '../boiler-ui/plugins/core'
import InstallationMenuPlugin from '../boiler-ui/plugins/installationMenu'

import core from './config/core'
import pages from './config/pages'
import menus from './config/menus'

import selectors from './selectors'

const installationPage = pages.installation

const plugins = [
  CorePlugin(core),
  PassportPlugin({
    appURL:core.appURL
  }),
  SnackbarPlugin(),
  InstallationMenuPlugin({
    title: installationPage.title,
    pluralTitle: installationPage.pluralTitle,
    installationsRoute: installationPage.route,
    menuConfig: menus,
    selector: selectors.installation.dropdown
  })
]

export default plugins