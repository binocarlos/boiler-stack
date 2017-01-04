import CrudAjax from '../boiler-ui/lib/api/crudajax'
import { MongoCodec } from '../boiler-ui/lib/api/codecs'
import URLS from './config/urls'

const MongoCrud = (opts = {}) => {
  return CrudAjax(Object.assign({}, opts, {
    encode: MongoCodec.encode,
    decode: MongoCodec.decode
  }))
}

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

export const installation = MongoCrud({
  name: 'installation',
  getUrl: () => URLS.installation
})

export const client = MongoCrud({
  name: 'client',
  getUrl: (query) => [URLS.client, query.currentInstallation].join('/')
})

export const project = MongoCrud({
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