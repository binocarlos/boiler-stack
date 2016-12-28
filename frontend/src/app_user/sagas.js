import UserSaga from '../boiler-ui/lib/plugins/user/saga'
import schemas from './config/schemas'
import { user as userActions } from './actions'
import { user as userSelectors } from './selectors'
import { user as userApis } from './apis'

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
    })

  ]
}

export default getSagas