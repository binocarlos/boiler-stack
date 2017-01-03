import MenuPlugin from '../boiler-ui/lib/plugins/menu'
import UserPlugin from '../boiler-ui/lib/plugins/user'
import TablePlugin from '../boiler-ui/lib/plugins/table'
import FormPlugin from '../boiler-ui/lib/plugins/form'
import SnackbarPlugin from '../boiler-ui/lib/plugins/snackbar'
import InstallationDropdownPlugin from '../boiler-ui/lib/plugins/installation_dropdown'

import { getRoute } from './tools'

import schemas from './config/schemas'
import formfields from './config/formfields'
import tables from './config/tables'
import icons from './config/icons'
import apis from './apis'

export const menu = MenuPlugin({
  base: 'MENU',
  selector: state => state.menu
})

export const snackbar = SnackbarPlugin({
  base: 'SNACKBAR',
  selector: state => state.snackbar
})

export const user = UserPlugin({
  base: 'USER',
  successRedirect: getRoute('/'),
  getLoginSchema: schemas.login,
  getRegisterSchema: schemas.register,
  apis: apis.user,
  selector: state => state.user
})

export const installation = {

  table: TablePlugin({
    name: 'INSTALLATION_TABLE',
    apis: apis.installation,
    selector: state => state.installation.table,
    title: 'Companies',
    icon: icons.installation,
    getTableFields: () => tables.installation.schema,
    // inject the current installation so we can use it
    // to map the 'active' field of the table
    mapStateToProps: (state) => {
      return {
        currentInstallation: plugins.user.selectors.status.currentInstallation(state)
      }
    },
    getMapFunction: (props) => tables.installation.map(props.currentInstallation),
    routes: {
      add: getRoute('/companies/add'),
      edit: getRoute('/companies/edit/:id')
    }
  }),
  
  form: FormPlugin({
    name: 'INSTALLATION_FORM',
    apis: apis.installation,
    selector: state => state.installation.form,
    title: 'Company',
    icon: icons.installation,
    getSchema: schemas.installation,
    getFormFields: formfields.installation,
    routes: {
      success: getRoute('/companies'),
      cancel: getRoute('/companies')
    }
  })
}

export const installationDropdown = InstallationDropdownPlugin({
  base: 'INSTALLATION_DROPDOWN',
  title: 'company',
  loadTrigger: installation.table.actions.list.request,
  userActions: user.actions,
  selectors: {
    userdata: user.selectors.status.data,
    installations: installation.table.selectors.items
  }
})

const plugins = {
  menu,
  snackbar,
  user,
  installation,
  installationDropdown
}

export default plugins