import Text from '../../boiler-ui/lib/components/formfields/Text'
import { getPathnameValue } from '../../boiler-ui/lib/tools'

const FORMS = {

  login: () => {
    return [{
      name: 'email',
      title: 'Email',
      component: Text,
      get: getPathnameValue('email')
    }, {
      name: 'password',
      title: 'Password',
      component: Text,
      get: getPathnameValue('password')
    }]
  }
  
}

export default FORMS