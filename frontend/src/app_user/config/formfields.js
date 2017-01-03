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
  },

  installation: () => {
    return [
      Text('name')
    ]
  },

  client: () => {
    return [
      Text('name')
    ]
  },

  project: () => {
    return [
      Text('name')
    ]
  }
  
}

export default FORMS