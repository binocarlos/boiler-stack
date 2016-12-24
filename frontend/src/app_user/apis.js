// api imports
import Ajax from '../folder-ui/lib/api/ajax'
import CrudAjax from '../folder-ui/lib/api/crudajax'
import {
  MongoCodec
} from '../folder-ui/lib/api/codecs'

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
      getUrl: () => URLS.auth.status
    }),
    login: CrudAjax({
      name: 'auth_login',
      getUrl: () => URLS.auth.login
    }),
    register: CrudAjax({
      name: 'auth_register',
      getUrl: () => URLS.auth.register
    }),
    update: CrudAjax({
      name: 'auth_update',
      getUrl: () => URLS.auth.update
    })
  },
  installation: {
    table: {
      load: CrudAjax({
        name: 'installation_table_load',
        getUrl: () => URLS.installation.table,
        encode: MongoCodec.encode
      })
    }
  }
}

export default apis