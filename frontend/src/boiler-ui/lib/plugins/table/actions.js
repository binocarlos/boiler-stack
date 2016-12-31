import ApiActions from '../../actions/api'
import ValueActions from '../../actions/value'

const CrudTableActions = (base) => {
  return {
    list: ApiActions(base + '_API_LIST'),
    selection: ValueActions(base + '__SELECTION')
  }
}

export default CrudTableActions
