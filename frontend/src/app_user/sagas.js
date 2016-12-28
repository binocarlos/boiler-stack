// saga imports
import ApiSaga from '../boiler-ui/lib/sagas/api'
import ApiTriggerSaga from '../boiler-ui/lib/sagas/apitrigger'
import FormSaga from '../boiler-ui/lib/sagas/form'
import Schema from '../boiler-ui/lib/utils/schema'

import selectors from './selectors'
import actions from './actions'
import schemas from './config/schemas'

const getSagas = (apis = {}) => {

  // user
  const userSagas = [

    // login form
    FormSaga({
      getSchema: () => Schema(schemas.login()),
      selector: selectors.login.form,
      actions: actions.user.login.form
    }),

    // register form
    FormSaga({
      getSchema: () => Schema(schemas.register()),
      selector: selectors.register.form,
      actions: actions.user.register.form
    }),

    // GET /auth/v1/status
    ApiSaga({
      api: apis.user.status.get,
      actions: actions.user.status.api
    }),

    // POST /auth/v1/login
    ApiSaga({
      api: apis.user.login.post,
      actions: actions.user.login.api
    }),

    // POST /auth/v1/register
    ApiSaga({
      api: apis.user.register.post,
      actions: actions.user.register.api
    }),

    // submit login form
    ApiTriggerSaga({
      trigger: actions.user.login.form.types.submit,
      handler: actions.user.login.api.request,
      selectors: {
        payload: selectors.login.formdata,
        query: (state) => null
      }
    }),

    // submit register form
    ApiTriggerSaga({
      trigger: actions.user.register.form.types.submit,
      handler: actions.user.register.api.request,
      selectors: {
        payload: selectors.register.formdata,
        query: (state) => null
      }
    }),

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