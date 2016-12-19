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
import SwitchActions from '../boiler-ui/actions/switch'

// actions
const actions = {
  user:{
    // put /api/v1/currentuser
    update: ApiActions('USER_UPDATE')
  },
  boiler:boilerActions,
  router:{
    redirect:routerActions.push,
    redirector:(route) => (extra) => routerActions.push(extra ? route + extra : route)
  },
  installation:{
    // api actions
    list: ApiActions('INSTALLATION_LIST'),
    get: ApiActions('INSTALLATION_GET'),
    post: ApiActions('INSTALLATION_POST'),
    put: ApiActions('INSTALLATION_PUT'),
    delete: ApiActions('INSTALLATIONS_DELETE'),
    // other actions
    form: FormActions('INSTALLATION_FORM'),
    selection: SelectActions('INSTALLATION_SELECTION'),
    confirmDelete: ToggleActions('INSTALLATION_CONFIRM_DELETE'),
    current: SwitchActions('INSTALLATION_SWITCH')
  }
}

export default actions