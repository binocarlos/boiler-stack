import MenuPlugin from '../../boiler-ui/lib/plugins/menu'
import SnackbarPlugin from '../../boiler-ui/lib/plugins/snackbar'

import user from './user'
import installation from './installation'
import installationDropdown from './installation_dropdown'

export const menu = MenuPlugin({
  base: 'MENU',
  selector: state => state.menu
})

export const snackbar = SnackbarPlugin({
  base: 'SNACKBAR',
  selector: state => state.snackbar
})

const plugins = {
  menu,
  snackbar,
  user,
  installation,
  installationDropdown
}

export default plugins