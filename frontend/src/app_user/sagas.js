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
    plugins.installation.activate.saga,
    plugins.installationDropdown.saga,
    plugins.client.table.saga,
    plugins.client.form.saga,
    plugins.project.table.saga,
    plugins.project.form.saga,
    RouteTriggerSaga({
      triggers,
      userLoadedActionType: actions.user.status.api.types.success
    })

  ]
}

export default getSagas