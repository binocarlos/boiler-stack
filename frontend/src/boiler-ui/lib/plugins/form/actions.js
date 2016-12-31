import ApiActions from '../../actions/api'
import FormActions from '../../actions/form'

const FormWrapperActions = (base) => {
  return {
    get: ApiActions(base + '_GET'),
    post: ApiActions(base + '_POST'),
    put: ApiActions(base + '_PUT'),
    data: FormActions(base + '_DATA')
  }
}

export default FormWrapperActions
