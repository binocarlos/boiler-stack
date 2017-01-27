import InstallationDropdownPlugin from '../../boiler-ui/lib/plugins/installation_dropdown'

import user from './user'
import installation from './installation'

const installationDropdown = InstallationDropdownPlugin({
  base: 'INSTALLATION_DROPDOWN',
  title: 'company',
  loadTrigger: installation.table.actions.list.request,
  userActions: user.actions,
  selectors: {
    loggedIn: user.selectors.status.loggedIn,
    currentInstallation: user.selectors.status.currentInstallation,
    installations: installation.table.selectors.items
  }
})

export default installationDropdown