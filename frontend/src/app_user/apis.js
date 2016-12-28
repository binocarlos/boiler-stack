// api imports
import Ajax from '../boiler-ui/lib/api/ajax'
import CrudAjax from '../boiler-ui/lib/api/crudajax'
import {
  MongoCodec
} from '../boiler-ui/lib/api/codecs'

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

// apis
const apis = {
  user: {
    status: CrudAjax({
      name: 'auth_status',
      getUrl: () => URLS.user.status
    }),
    login: CrudAjax({
      name: 'auth_login',
      getUrl: () => URLS.user.login
    }),
    register: CrudAjax({
      name: 'auth_register',
      getUrl: () => URLS.user.register
    }),
    update: CrudAjax({
      name: 'auth_update',
      getUrl: () => URLS.user.update
    })
  },
  installation: {
    table: CrudAjax({
      name: 'installation_table',
      getUrl: () => URLS.installation.table,
      encode: MongoCodec.encode
    })
  }
}

export default apis