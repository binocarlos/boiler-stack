import RouterActions from '../boiler-ui/lib/actions/router'
import ToggleActions from '../boiler-ui/lib/actions/toggle'
import UserActions from '../boiler-ui/lib/plugins/user/actions'

export const router = RouterActions('ROUTER')
export const menu = ToggleActions('MENU')
export const user = UserActions('USER')

const actions = {
  router,
  menu,
  user
}

export default actions