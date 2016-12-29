import ApiActions from '../../actions/api'
import ValueActions from '../../actions/value'

const CrudTableActions = (base) => {
  return {
    api: {
      list: ApiActions(base + '_API_LIST')
    },
    selection: ValueActions(base + '__SELECTION'),
    data: ValueActions(base + '_DATA')
  }
}

export default CrudTableActions
