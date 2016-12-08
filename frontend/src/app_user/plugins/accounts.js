import Crud from '../../plugins/crud'
import MongoCodec from '../../api/mongocodec'

const AccountsPlugin = (settings = {}) => {

  const mongoCodec = MongoCodec({
    inject:{
      _type:'account'
    }
  })

  return Crud({
    title:'Account',
    apiUrl:'/api/v1/accounts',
    route:'accounts',
    reducerName:'accounts',
    actionPrefix:'ACCOUNTS',
    codec:mongoCodec
  })

}

export default AccountsPlugin