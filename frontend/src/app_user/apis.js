import UserApis from '../boiler-ui/lib/plugins/user/apis'

const URLS = {
  user: {
    status: '/auth/v1/status',
    login: '/auth/v1/login',
    register: '/auth/v1/register',
    update: '/api/v1/currentuser'
  },
  installation: {
    table: '/api/v1/installation'
  }
}

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