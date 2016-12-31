import Text from '../../boiler-ui/lib/utils/schema/text'

const SCHEMAS = {

  login: () => {
    return [
      Text({
        name: 'email',
        required: true
      }),
      Text({
        name: 'password',
        required: true,
        minLength: 4
      })
    ]
  },

  register: () => {
    return [
      Text({
        name: 'email',
        required: true
      }),
      Text({
        name: 'password',
        required: true,
        minLength: 4
      })
    ]
  },

  installation: () => {
    return [
      Text({
        name: 'name',
        required: true
      })
    ]
  }
}

export default SCHEMAS