import CrudAjax from '../boiler-ui/lib/api/crudajax'
import URLS from './config/urls'

const UserApis = (urls = {}) => {
  return {
    status: CrudAjax({
      name: 'user_status',
      getUrl: urls.status
    }),
    login: CrudAjax({
      name: 'user_login',
      getUrl: urls.login
    }),
    register: CrudAjax({
      name: 'user_register',
      getUrl: urls.register
    }),
    update: CrudAjax({
      name: 'user_update',
      getUrl: urls.update
    })
  }
}


export const user = UserApis({
  status: () => URLS.user.status,
  login: () => URLS.user.login,
  register: () => URLS.user.register,
  update: () => URLS.user.update
})

export const installation = CrudAjax({
  name: 'installation',
  getUrl: () => URLS.installation
})

export const client = CrudAjax({
  name: 'client',
  getUrl: (query) => [URLS.client, query.currentInstallation].join('/')
})

export const project = CrudAjax({
  name: 'project',
  getUrl: (query) => [URLS.project, query.currentInstallation].join('/')
})

const apis = {
  user,
  installation,
  client,
  project
}

export default apis