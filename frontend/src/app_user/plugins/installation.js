import TablePlugin from '../../boiler-ui/lib/plugins/table'
import FormPlugin from '../../boiler-ui/lib/plugins/form'

import { getRoute } from '../tools'

import schemas from '../config/schemas'
import formfields from '../config/formfields'
import tables from '../config/tables'
import icons from '../config/icons'
import apis from '../apis'

import user from './user'

const installation = {

  table: TablePlugin({
    name: 'INSTALLATION_TABLE',
    apis: apis.installation,
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
  }),
  
  form: FormPlugin({
    name: 'INSTALLATION_FORM',
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
}

export default installation