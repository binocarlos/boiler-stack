// action imports
import {
  status
} from 'passport-slim-ui/src/actions'

import { routerActions } from 'react-router-redux'

import * as boilerActions from 'boiler-frontend/src/actions'

import ApiActions from '../folder-ui/actions/api'
import FormActions from '../folder-ui/actions/form'
import SelectionActions from '../folder-ui/actions/selection'
import ToggleActions from '../folder-ui/actions/toggle'
import TriggerActions from '../folder-ui/actions/trigger'

import {
  mergeActions,
  createActions
} from '../folder-ui/actions/tools'

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
      SelectActions
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

export default actions