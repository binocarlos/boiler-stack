// saga imports
import Api from '../folder-ui/lib/sagas/api'
import SwitchInstallation from '../boiler-ui/lib/sagas/switchInstallation'
import RefreshUser from '../boiler-ui/lib/sagas/refreshUser'

import selectors from './selectors'
import actions from './actions'
import apis from './apis'

// user
const userSagas = [

/*
  // save the current user data
  Api({
    handler: apis.currentuser.put,
    actions: actions.user.update
  }),

  // reload the user after put /currentuser
  RefreshUser({
    trigger: actions.user.update.types.success
  })
*/
]

// installation
const installationSagas = [
  
  Api({
    handler: apis.installation.get,
    actions: actions.installation.api.list
  })
/*
  Api({
    handler: apis.installation.get,
    actions: actions.installation.api.get
  }),

  Api({
    handler: apis.installation.post,
    actions: actions.installation.api.post
  }),

  Api({
    handler: apis.installation.post,
    actions: actions.installation.api.put
  }),

  Api({
    handler: apis.installation.delete,
    actions: actions.installation.api.delete
  }),

  SwitchInstallation({
    selectors: {
      user: selectors.user.data
    },
    actions:{
      saveUser: actions.user.update.request
    },
    trigger: actions.installation.switch.types.trigger
  })*/
]

const sagas = []
  .concat(userSagas)
  .concat(installationSagas)

export default sagas