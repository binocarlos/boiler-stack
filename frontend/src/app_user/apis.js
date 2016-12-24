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
  auth: CrudAjax({
    name: 'auth',
    getUrl: () => URLS.auth
  }),
  currentuser: CrudAjax({
    name: 'currentuser',
    getUrl: () => URLS.currentuser,
    encode: MongoCodec.encode
  }),
  installation: CrudAjax({
    name: 'installation',
    getUrl: () => URLS.installation,
    encode: MongoCodec.encode
  })
}

export default apis