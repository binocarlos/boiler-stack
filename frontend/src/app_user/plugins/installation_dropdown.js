import InstallationDropdownPlugin from '../../boiler-ui/lib/plugins/installation_dropdown'

import user from './user'
import installation from './installation'

const installationDropdown = InstallationDropdownPlugin({
  base: 'INSTALLATION_DROPDOWN',
  title: 'company',
  loadTrigger: installation.table.actions.list.request,
  userActions: user.actions,
  selectors: {
    userrecord: user.selectors.status.record,
    userdata: user.selectors.status.data,
    installations: installation.table.selectors.items
  }
})

export default installationDropdown