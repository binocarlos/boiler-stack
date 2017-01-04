import Text from '../../boiler-ui/lib/utils/formfields/text'
import Select from '../../boiler-ui/lib/utils/formfields/select'
import LoadSelect from '../../boiler-ui/lib/utils/formfields/loadselect'

import plugins from '../plugins'

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
      Text('name'),
      LoadSelect({
        name: 'clientid',
        title: 'Client',
        selector: plugins.client.table.selectors.items,
        trigger: plugins.client.table.actions.list.request,
        mapOptions: (client) => {
          return {
            value: client.id,
            label: client.name
          }
        }
      })
    ]
  }
  
}

export default FORMS