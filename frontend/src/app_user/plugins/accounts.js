import Crud from '../../folder-ui/plugins/crud'
import {
  mongoCodecFactory,
  codecFactory,
  ajaxFactory
} from '../apis'

const TYPE = 'account'
const TITLE = 'Account'
const API_URL = '/api/v1/accounts'
const ROUTE = 'accounts'
const REDUCER = 'accounts'
const ACTION_PREFIX = 'ACCOUNTS'

const AccountsPlugin = (settings = {}) => {

  const api = ajaxFactory({
    name:TITLE
  })
  const codec = mongoCodecFactory(TYPE)

  return Crud({
    title:TITLE,
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

export default AccountsPlugin