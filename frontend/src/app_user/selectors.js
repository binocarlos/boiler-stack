import MenuSelectors from '../boiler-ui/lib/plugins/menu/selectors'
import UserSelectors from '../boiler-ui/lib/plugins/user/selectors'
import TableSelectors from '../boiler-ui/lib/plugins/table/selectors'

export const router = (state) => state.router
export const menu = MenuSelectors(state => state.menu)
export const user = UserSelectors(state => state.user)
export const installation = {
  raw: state => state.installation,
  table: TableSelectors(state => installation.raw(state).table),
  form: state => installation.raw(state).form,
  formfields: state => installation.form(state).fields
}

const selectors = {
  router,
  menu,
  user,
  installation
}

export default selectors