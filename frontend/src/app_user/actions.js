import RouterActions from '../boiler-ui/lib/actions/router'

import MenuActions from '../boiler-ui/lib/plugins/menu/actions'
import UserActions from '../boiler-ui/lib/plugins/user/actions'
import CrudActions from '../boiler-ui/lib/plugins/crud/actions'

export const router = RouterActions
export const menu = MenuActions('MENU')
export const user = UserActions('USER')
export const installation = CrudActions('INSTALLATION')

const actions = {
  router,
  menu,
  user,
  installation
}

export default actions