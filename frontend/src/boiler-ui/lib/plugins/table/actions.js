import ApiActions from '../../actions/api'
import ValueActions from '../../actions/value'
import ToggleActions from '../../actions/toggle'

const TableActions = (base) => {
  return {
    list: ApiActions(base + '_LIST'),
    delete: ApiActions(base + '_DELETE'),
    selection: ValueActions(base + '_SELECTION'),
    deleteWindow: ToggleActions(base + '_DELETE_WINDOW')
  }
}

export default TableActions
