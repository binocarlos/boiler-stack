// saga imports
import ApiSaga from '../folder-ui/lib/sagas/api'
/*import SwitchInstallation from '../boiler-ui/lib/sagas/switchInstallation'
import RefreshUser from '../boiler-ui/lib/sagas/refreshUser'*/

import selectors from './selectors'
import actions from './actions'

const getSagas = (apis = {}) => {

  // user
  const userSagas = [

    // GET /auth/v1/status
    ApiSaga({
      handler: apis.user.status.get,
      actions: actions.user.status
    })

  ]

  // installation
  const installationSagas = [
    
    // GET /api/v1/installations
    ApiSaga({
      handler: apis.installation.table.load.get,
      actions: actions.installation.table.load
    })

  ]

  const sagas = []
    .concat(userSagas)
    .concat(installationSagas)

  return sagas
}

export default getSagas