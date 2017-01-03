import CrudAjax from '../boiler-ui/lib/api/crudajax'
import { MongoCodec } from '../boiler-ui/lib/api/codecs'
import UserApis from '../boiler-ui/lib/plugins/user/apis'
import URLS from './config/urls'

export const user = UserApis({
  status: () => URLS.user.status,
  login: () => URLS.user.login,
  register: () => URLS.user.register,
  update: () => URLS.user.update
})

export const installation = CrudAjax({
  name: 'installation',
  getUrl: () => URLS.installation,
  encode: MongoCodec.encode,
  decode: MongoCodec.decode
})

const apis = {
  user,
  installation
}

export default apis