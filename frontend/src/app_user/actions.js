import ApiActions from '../boiler-ui/lib/actions/api'
import RouterActions from '../boiler-ui/lib/actions/router'
import ToggleActions from '../boiler-ui/lib/actions/toggle'
import FormActions from '../boiler-ui/lib/actions/form'

import UserActions from '../boiler-ui/lib/plugins/user/actions'

/*import FormActions from '../folder-ui/lib/actions/form'
import SelectionActions from '../folder-ui/lib/actions/selection'
import ToggleActions from '../folder-ui/lib/actions/toggle'
import TriggerActions from '../folder-ui/lib/actions/trigger'*/

import {
  mergeActions,
  createActions
} from '../folder-ui/lib/actions/tools'

const actions = {

  router: RouterActions('ROUTER'),
  menu: ToggleActions('MENU'),

  user: UserActions('USER')
}

/*
// actions
const actions = {

  boiler: boilerActions,

  router: {

    redirect: routerActions.push,
    redirector: (route) => (extra) => routerActions.push(extra ? route + extra : route)

  },

  user: {

    // put /api/v1/currentuser
    update: ApiActions('USER_UPDATE')

  },

  installation: {

    dropdown: mergeActions('INSTALLATION_DROPDOWN', [
      createActions(['SWITCH'])
    ]),

    table: mergeActions('INSTALLATION_TABLE', [
      // select
      SelectionActions
    ]),

    form: mergeActions('INSTALLATION_FORM', [
      // initialize, update, revert
      FormActions,
      createActions(['SAVE'])
    ]),

    deleteWindow: mergeActions('INSTALLATION_DELETE_WINDOW', [
      // open, close
      ToggleActions,
      createActions(['CONFIRM'])
    ]),

    api: {
      list: ApiActions('INSTALLATION_API_LIST'),
      get: ApiActions('INSTALLATION_API_GET'),
      post: ApiActions('INSTALLATION_API_POST'),
      put: ApiActions('INSTALLATION_API_PUT'),
      delete: ApiActions('INSTALLATIONS_API_DELETE')
    }
  }
}
*/
export default actions