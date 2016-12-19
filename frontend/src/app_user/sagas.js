// saga imports
import Api from '../folder-ui/sagas/api'
import SwitchInstallation from '../boiler-ui/sagas/switchInstallation'
import RefreshUser from '../boiler-ui/sagas/refreshUser'

import {
  getUserData
} from '../passport-slim-ui/src/selectors'

import actions from './actions'
import apis from './apis'

const getCrudApiSagas = (api, actions) => {
  return [
    // get
    Api({
      handler: api.get,
      actions: actions.get
    }),

    // post
    Api({
      handler: api.post,
      actions: actions.post
    }),

    // put
    Api({
      handler: api.post,
      actions: actions.put
    }),

    // delete
    Api({
      handler: api.delete,
      actions: actions.delete
    })
  ]
}

const userSagas = [
  // save the current user data
  Api({
    handler: apis.currentuser.put,
    actions: actions.user.update
  }),

  // reload the user after put /currentuser
  RefreshUser({
    trigger: actions.user.update.types.success
  })
]

const installationSagas = [
  // load the installation table list
  Api({
    handler: apis.installation.get,
    actions: actions.installation.list
  }),

  // update the user when the installation is changed
  SwitchInstallation({
    selectors: {
      user: getUserData
    },
    actions:{
      saveUser: actions.user.update.request
    },
    trigger: actions.installation.active.types.switch
  })
].concat(getCrudApiSagas(
  apis.installation,
  actions.installation
))

const sagas = []
  .concat(userSagas)
  .concat(installationSagas)

export default sagas