import RouteTriggerSaga from '../boiler-ui/lib/sagas/routetrigger'
import UserSaga from '../boiler-ui/lib/plugins/user/saga'
import TableSaga from '../boiler-ui/lib/plugins/table/saga'
import FormSaga from '../boiler-ui/lib/plugins/form/saga'

import schemas from './config/schemas'
import selectors from './selectors'
import actions from './actions'
import apis from './apis'

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
      actions: actions.user,
      selectors: selectors.user,
      apis: apis.user
    }),

    // installation table
    TableSaga({
      actions: actions.installation.table,
      apis: apis.installation
    }),

    // installation form
    FormSaga({
      getSchema: schemas.installation,
      actions: actions.installation.form,
      selector: selectors.installation.formfields,
      apis: apis.installation,
      successRedirect: getRoute('/companies')
    })

  ]
}

export default getSagas