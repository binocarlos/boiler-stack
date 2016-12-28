import RouterActions from '../boiler-ui/lib/actions/router'

import MenuActions from '../boiler-ui/lib/plugins/menu/actions'
import UserActions from '../boiler-ui/lib/plugins/user/actions'

export const router = RouterActions
export const menu = MenuActions('MENU')
export const user = UserActions('USER')

const actions = {
  router,
  menu,
  user
}

export default actions