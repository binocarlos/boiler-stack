import MenuPlugin from '../boiler-ui/lib/plugins/menu'
import UserPlugin from '../boiler-ui/lib/plugins/user'
import TablePlugin from '../boiler-ui/lib/plugins/table'
import FormPlugin from '../boiler-ui/lib/plugins/form'

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
    title: 'Company',
    icon: icons.installation,
    getTableFields: () => tables.installation.schema,
    // inject the current installation so we can use it
    // to map the 'active' field of the table
    mapStateToProps: (state) => {
      const userData = plugins.user.selectors.status.record(state).data || {}
      return {
        currentInstallation: userData.currentInstallation
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

const plugins = {
  menu,
  user,
  installation
}

export default plugins