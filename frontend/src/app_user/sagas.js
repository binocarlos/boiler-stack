// saga imports
import ApiSaga from '../boiler-ui/lib/sagas/api'
import FormSaga from '../boiler-ui/lib/sagas/form'
import Schema from '../boiler-ui/lib/utils/schema'

import selectors from './selectors'
import actions from './actions'
import schemas from './config/schemas'

const getSagas = (apis = {}) => {

  // user
  const userSagas = [

    // GET /auth/v1/status
    ApiSaga({
      api: apis.user.status.get,
      actions: actions.user.status.api
    }),

    // login form
    FormSaga({
      getSchema: () => Schema(schemas.login()),
      selector: selectors.login.form,
      actions: actions.user.login.form
    })

  ]

  // installation
  const installationSagas = [
    
    // GET /api/v1/installations
    ApiSaga({
      api: apis.installation.table.get,
      actions: actions.installation.table.api
    })

  ]

  const sagas = []
    .concat(userSagas)
    .concat(installationSagas)

  return sagas
}

export default getSagas