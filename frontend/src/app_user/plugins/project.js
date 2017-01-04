import TablePlugin from '../../boiler-ui/lib/plugins/table'
import FormPlugin from '../../boiler-ui/lib/plugins/form'

import { getRoute } from '../tools'

import schemas from '../config/schemas'
import formfields from '../config/formfields'
import tables from '../config/tables'
import icons from '../config/icons'
import apis from '../apis'

import client from './client'

const project = {

  table: TablePlugin({
    name: 'PROJECT_TABLE',
    apis: apis.project,
    selector: state => state.project.table,
    title: 'Projects',
    icon: icons.project,
    getTableFields: () => tables.project.schema,
    mapStateToProps: (state) => {
      const db = client.table.selectors.data(state).db
      return {
        clients: db
      }
    },
    getMapFunction: tables.project.map,
    routes: {
      add: getRoute('/projects/add'),
      edit: getRoute('/projects/edit/:id')
    }
  }),
  
  form: FormPlugin({
    name: 'PROJECT_FORM',
    apis: apis.project,
    selector: state => state.project.form,
    title: 'Project',
    icon: icons.project,
    getSchema: schemas.project,
    getFormFields: formfields.project,
    routes: {
      success: getRoute('/projects'),
      cancel: getRoute('/projects')
    }
  })
}

export default project