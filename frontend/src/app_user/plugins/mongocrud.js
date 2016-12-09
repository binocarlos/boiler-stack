import Crud from '../../folder-ui/plugins/crud'
import {
  mongoCodecFactory,
  codecFactory,
  ajaxFactory
} from '../apis'

const REQUIRED_SETTINGS = [
  'type',
  'title',
  'api_url',
  'route',
  'reducer',
  'action_prefix'
]

const MongoCrudFactory = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  const TYPE = settings.type
  const TITLE = settings.title
  const PLURAL_TITLE = settings.plural_title || settings.title + 's'
  const API_URL = settings.api_url
  const ROUTE = settings.route
  const REDUCER = settings.reducer
  const ACTION_PREFIX = settings.action_prefix

  const api = ajaxFactory({
    name:TITLE
  })
  const codec = mongoCodecFactory(TYPE)

  return Crud({
    title:TITLE,
    icon:settings.icon,
    getTitle:(state, routeInfo) => {
      return routeInfo.widget == 'table' ?
        PLURAL_TITLE :
        (routeInfo.mode == 'add' ?
          'New ' + TITLE :
          'Edit Title'
        )
    },
    route:ROUTE,
    reducerName:REDUCER,
    actionPrefix:ACTION_PREFIX,
    api:{
      loadTableData:(action) => {
        return api
          .get(API_URL)
          .then(data => {
            return data.map(codec.encode)
          })
      }
    },
    getInitialData:() => {
      return {
        name:'apples'
      }
    },
    getTableFields:(state, store, routeInfo) => {
      return [{
        name:'littleid',
        title:'ID'
      },{
        name:'name',
        title:'Name'
      }]
    },
    getSchema:(state, store, routeInfo) => {
      return [{
        name:'name'
      }]
    }
  })

}

export default MongoCrudFactory