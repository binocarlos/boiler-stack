import UserSaga from '../boiler-ui/lib/plugins/user/saga'
import RouteTriggerSaga from '../boiler-ui/lib/sagas/routetrigger'
import ApiSaga from '../boiler-ui/lib/sagas/api'
import schemas from './config/schemas'
import { user as userSelectors } from './selectors'

import { 
  user as userActions,
  installation as installationActions
} from './actions'

import { 
  user as userApis,
  installation as installationApi
} from './apis'


import { triggers } from './routes'
import { getRoute } from './tools'

const getSagas = (apis = {}) => {

  return [

    // listen for route changes and run the corresponding trigger
    RouteTriggerSaga({
      triggers
    }),

    // looks after authentication of routes, login/register
    // and loading user status upon initialization
    UserSaga({
      successRedirect: getRoute('/'),
      getLoginSchema: schemas.login,
      getRegisterSchema: schemas.register,
      actions: userActions,
      selectors: userSelectors,
      apis: userApis
    }),

    // installation api sagas

    // GET /api/v1/installations
    ApiSaga({
      api: installationApi.list,
      actions: installationActions.table.list
    }),

    // GET /api/v1/installations/:id
    ApiSaga({
      api: installationApi.get,
      actions: installationActions.form.get
    }),

    // POST /api/v1/installations
    ApiSaga({
      api: installationApi.post,
      actions: installationActions.form.post
    }),

    // PUT /api/v1/installations/:id
    ApiSaga({
      api: installationApi.put,
      actions: installationActions.form.put
    })

  ]
}

export default getSagas