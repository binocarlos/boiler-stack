import TablePlugin from '../../boiler-ui/lib/plugins/table'
import FormPlugin from '../../boiler-ui/lib/plugins/form'
import ApiActions from '../../boiler-ui/lib/actions/api'
import ApiSaga from '../../boiler-ui/lib/sagas/api'

import { getRoute } from '../tools'

import schemas from '../config/schemas'
import formfields from '../config/formfields'
import tables from '../config/tables'
import icons from '../config/icons'
import apis from '../apis'

import user from './user'

const table = TablePlugin({
  name: 'INSTALLATION_TABLE',
  apis: {
    list: apis.installation.list,
    delete: apis.installation.delete
  },
  selector: state => state.installation.table,
  title: 'Companies',
  icon: icons.installation,
  getTableFields: () => tables.installation.schema,
  // inject the current installation so we can use it
  // to map the 'active' field of the table
  mapStateToProps: (state) => {
    return {
      currentInstallation: user.selectors.status.currentInstallation(state)
    }
  },
  getMapFunction: tables.installation.map,
  routes: {
    add: getRoute('/companies/add'),
    edit: getRoute('/companies/edit/:id')
  }
})

const form = FormPlugin({
  name: 'INSTALLATION_FORM',
  apis: {
    get: apis.installation.get,
    put: apis.installation.put,
    post: apis.installation.post
  },
  apis: apis.installation,
  selector: state => state.installation.form,
  title: 'Company',
  icon: icons.installation,
  getSchema: schemas.installation,
  getFormFields: formfields.installation,
  routes: {
    success: getRoute('/companies'),
    cancel: getRoute('/companies')
  }
})

const activateAction = ApiActions('INSTALLATION_ACTIVATE')
const activate = {
  action: activateAction,
  saga: ApiSaga({
    api: apis.installation.activate,
    actions: activateAction
  })
}

const installation = {
  table,
  form,
  activate
}

export default installation