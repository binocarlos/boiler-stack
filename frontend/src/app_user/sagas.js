import RouteTriggerSaga from '../boiler-ui/lib/sagas/routetrigger'

import plugins from './plugins'
import actions from './actions'

import { triggers } from './routes'

const getSagas = (apis = {}) => {

  return [

    plugins.user.saga,
    plugins.snackbar.saga,
    plugins.installation.table.saga,
    plugins.installation.form.saga,
    plugins.installationDropdown.saga,
    RouteTriggerSaga({
      triggers,
      userLoadedActionType: actions.user.status.api.types.success
    })

  ]
}

export default getSagas