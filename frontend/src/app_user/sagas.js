import UserSaga from '../boiler-ui/lib/plugins/user/saga'
import RouteTriggerSaga from '../boiler-ui/lib/sagas/routetrigger'
import CrudTableSaga from '../boiler-ui/lib/plugins/crudtable/saga'
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

    UserSaga({
      successRedirect: getRoute('/'),
      getLoginSchema: schemas.login,
      getRegisterSchema: schemas.register,
      actions: userActions,
      selectors: userSelectors,
      apis: userApis
    }),

    CrudTableSaga({
      api: installationApi.list,
      actions: installationActions.table.api
    }),

    RouteTriggerSaga({
      triggers
    })

  ]
}

export default getSagas