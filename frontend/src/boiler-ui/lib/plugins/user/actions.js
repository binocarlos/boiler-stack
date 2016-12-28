import ApiActions from '../../actions/api'
import FormActions from '../../actions/form'

const UserActions = (base) => {
  return {
    status: {
      api: ApiActions(base + 'STATUS_API')
    },
    login: {
      api: ApiActions(base + 'LOGIN_API'),
      form: FormActions(base + 'LOGIN_FORM')
    },
    register: {
      api: ApiActions(base + 'REGISTER_API'),
      form: FormActions(base + 'REGISTER_FORM')
    }
  }
}

export default UserActions