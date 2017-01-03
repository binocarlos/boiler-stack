import UserPlugin from '../../boiler-ui/lib/plugins/user'

import { getRoute } from '../tools'
import schemas from '../config/schemas'
import apis from '../apis'

const user = UserPlugin({
  base: 'USER',
  successRedirect: getRoute('/'),
  getLoginSchema: schemas.login,
  getRegisterSchema: schemas.register,
  apis: apis.user,
  selector: state => state.user
})

export default user