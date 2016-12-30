import Text from '../../boiler-ui/lib/utils/formfields/text'

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