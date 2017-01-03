import CrudAjax from '../boiler-ui/lib/api/crudajax'
import { MongoCodec } from '../boiler-ui/lib/api/codecs'
import UserApis from '../boiler-ui/lib/plugins/user/apis'
import URLS from './config/urls'

const MongoCrud = (opts = {}) => {
  return CrudAjax(Object.assign({}, opts, {
    encode: MongoCodec.encode,
    decode: MongoCodec.decode
  }))
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

const apis = {
  user,
  installation
}

export default apis