// api imports
import Ajax from '../folder-ui/api/ajax'
import CrudAjax from '../folder-ui/api/crudajax'
import {
  MongoCodec
} from '../folder-ui/api/codecs'

import urls from './config/urls'

// apis
const apis = {
  currentuser: CrudAjax({
    getUrl: () => urls.currentuser,
    encode: MongoCodec.encode
  }),
  installation: CrudAjax({
    getUrl: () => urls.installation,
    encode: MongoCodec.encode
  })
}

export default apis