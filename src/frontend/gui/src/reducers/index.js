import config from '../config'
import urlfactory from '../../../shared/common/reducers/urls'

export const urls = urlfactory(config.urls)
export project from './project'
export library from './library'
export user from '../../../shared/auth/reducers/user'
export loginform from '../../../shared/auth/reducers/loginform'
export login from '../../../shared/auth/reducers/login'
export register from '../../../shared/auth/reducers/register'