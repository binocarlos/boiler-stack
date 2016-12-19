// plugin imports
import PassportPlugin from 'passport-slim-ui/src/plugin'
import SnackbarPlugin from 'boiler-frontend/src/plugins/snackbar'

import CorePlugin from '../boiler-ui/plugins/core'
import MenuPlugin from '../boiler-ui/plugins/menus'
import InstallationMenuPlugin from '../boiler-ui/plugins/installationMenu'

// config imports
import core from './config/core'
import pages from './config/pages'
import menus from './config/menus'

// controller imports
import actions from './actions'
import reducers from './reducers'
import selectors from './selectors'
import sagas from './sagas'
import getRoutes from './routes'

const installationPage = pages.installation

const installationMenuPlugin = InstallationMenuPlugin({
  title: installationPage.title,
  pluralTitle: installationPage.pluralTitle,
  installationsRoute: installationPage.route,
  menuConfig: menus,
  selector: selectors.installationMenu
})

// map the master reducer object into an array of plugins
// so the boiler-frontend factory merges the top-level keys
// into the other reducers
const reducerPlugins = Object.keys(reducers || {}).map((id) => {
  return {
    id,
    getReducer:() => reducers[id]
  }
})

const routesPlugin = {
  getRoutes:getRoutes
}

const sagaPlugin = {
  getSagas:() => sagas
}

// plugins
const plugins = [
  CorePlugin(core),
  PassportPlugin({
    appURL:core.appURL
  }),
  SnackbarPlugin(),
  installationMenuPlugin,
  sagaPlugin,
  routesPlugin,
].concat(reducerPlugins)

export default plugins