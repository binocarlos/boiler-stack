import TablePlugin from '../../boiler-ui/lib/plugins/table'
import FormPlugin from '../../boiler-ui/lib/plugins/form'

import { getRoute } from '../tools'

import schemas from '../config/schemas'
import formfields from '../config/formfields'
import tables from '../config/tables'
import icons from '../config/icons'
import apis from '../apis'

import user from './user'

const client = {

  table: TablePlugin({
    name: 'CLIENT_TABLE',
    apis: apis.client,
    selector: state => state.client.table,
    title: 'Clients',
    icon: icons.client,
    getTableFields: () => tables.client.schema,
    getMapFunction: tables.client.map,
    routes: {
      add: getRoute('/clients/add'),
      edit: getRoute('/clients/edit/:id')
    }
  }),
  
  form: FormPlugin({
    name: 'CLIENT_FORM',
    apis: apis.client,
    selector: state => state.client.form,
    title: 'Client',
    icon: icons.client,
    getSchema: schemas.client,
    getFormFields: formfields.client,
    routes: {
      success: getRoute('/clients'),
      cancel: getRoute('/clients')
    }
  })
}

export default client