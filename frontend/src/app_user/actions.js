import RouterActions from '../boiler-ui/lib/actions/router'

import MenuActions from '../boiler-ui/lib/plugins/menu/actions'
import UserActions from '../boiler-ui/lib/plugins/user/actions'
import TableActions from '../boiler-ui/lib/plugins/table/actions'
import FormActions from '../boiler-ui/lib/plugins/form/actions'

export const router = RouterActions
export const menu = MenuActions('MENU')
export const user = UserActions('USER')
export const installation = {
  table: TableActions('INSTALLATION_TABLE'),
  form: FormActions('INSTALLATION_FORM')
}

const actions = {
  router,
  menu,
  user,
  installation
}

export default actions