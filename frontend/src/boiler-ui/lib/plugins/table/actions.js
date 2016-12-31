import ApiActions from '../../actions/api'
import ValueActions from '../../actions/value'

const CrudTableActions = (base) => {
  return {
    list: ApiActions(base + '_LIST'),
    selection: ValueActions(base + '_SELECTION')
  }
}

export default CrudTableActions
