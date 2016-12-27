import Text from '../../boiler-ui/lib/utils/form/Text'

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

  installation: () => {
    return [
      Text('name')
    ]
  }
}

export default SCHEMAS