import Text from '../../boiler-ui/lib/utils/formfields/Text'

const FORMS = {

  login: () => {
    return [
      Text('email'),
      Text('password')
    ]
  },

  register: () => {
    return [
      Text('email'),
      Text('password')
    ]
  }
  
}

export default FORMS