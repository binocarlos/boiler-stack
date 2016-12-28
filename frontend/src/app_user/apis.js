// api imports
import Ajax from '../boiler-ui/lib/api/ajax'
import CrudAjax from '../boiler-ui/lib/api/crudajax'
import {
  MongoCodec
} from '../boiler-ui/lib/api/codecs'

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

// apis
const apis = {
  user: UserApis({
    status: () => URLS.user.status,
    login: () => URLS.user.login,
    register: () => URLS.user.register,
    update: () => URLS.user.update
  })/*
  installation: {
    table: CrudAjax({
      name: 'installation_table',
      getUrl: () => URLS.installation.table,
      encode: MongoCodec.encode
    })
  }*/
}

export default apis