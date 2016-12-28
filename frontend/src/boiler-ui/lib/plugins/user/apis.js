// api imports
import deepCheck from 'deep-check-error'
import Ajax from '../../api/ajax'
import CrudAjax from '../../api/crudajax'
import {
  MongoCodec
} from '../../api/codecs'

const REQUIRED_URLS = [
  'status',
  'login',
  'register',
  'update'
]

const Apis = (urls = {}) => {
  deepCheck(urls, REQUIRED_URLS)
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

export default Apis