import MenuSelectors from '../boiler-ui/lib/plugins/menu/selectors'
import UserSelectors from '../boiler-ui/lib/plugins/user/selectors'

export const router = (state) => state.router
export const menu = MenuSelectors(state => state.menu)
export const user = UserSelectors(state => state.user)

const selectors = {
  router,
  menu,
  user
}

export default selectors