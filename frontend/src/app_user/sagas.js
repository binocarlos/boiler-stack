import RouteTriggerSaga from '../boiler-ui/lib/sagas/routetrigger'
import UserSaga from '../boiler-ui/lib/plugins/user/saga'
import FormSaga from '../boiler-ui/lib/plugins/form/saga'
import ApiSaga from '../boiler-ui/lib/sagas/api'

import schemas from './config/schemas'

import { 
  user as userSelectors,
  installation as installationSelectors
} from './selectors'

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

    // installation table

    // GET /api/v1/installations
    ApiSaga({
      api: installationApi.list,
      actions: installationActions.table.list
    }),


    // installation form
    FormSaga({
      getSchema: schemas.installation,
      actions: installationActions.form,
      selector: installationSelectors.form,
      apis: installationApi
    })

  ]
}

export default getSagas