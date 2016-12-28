import UserApis from '../boiler-ui/lib/plugins/user/apis'
import URLS from './config/urls'

export const user = UserApis({
  status: () => URLS.user.status,
  login: () => URLS.user.login,
  register: () => URLS.user.register,
  update: () => URLS.user.update
})

const apis = {
  user
}

export default apis