import RouteTriggerSaga from '../boiler-ui/lib/sagas/routetrigger'
import { triggers } from './routes'
import plugins from './plugins'

const getSagas = (apis = {}) => {

  return [

    plugins.user.saga,
    plugins.installation.table.saga,
    plugins.installation.form.saga,
    RouteTriggerSaga({
      triggers
    })

  ]
}

export default getSagas