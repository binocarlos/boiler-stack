import ApiActions from '../../actions/api'
import ValueActions from '../../actions/value'

const CrudActions = (base) => {
  return {
    list: {
      api: ApiActions(base + '_LIST_API'),
      selection: ValueActions(base + '_LIST_SELECTION'),
      data: ValueActions(base + '_LIST_DATA')
    }
  }
}

export default CrudActions
