import ApiActions from '../boiler-ui/lib/actions/api'
import RouterActions from '../boiler-ui/lib/actions/router'
import ToggleActions from '../boiler-ui/lib/actions/toggle'
import FormActions from '../boiler-ui/lib/actions/form'

import UserActions from '../boiler-ui/lib/plugins/user/actions'

import {
  mergeActions,
  createActions
} from '../folder-ui/lib/actions/tools'

export const router = RouterActions('ROUTER')
export const menu = ToggleActions('MENU')
export const user = UserActions('USER')

const actions = {
  router,
  menu,
  user
}

export default actions