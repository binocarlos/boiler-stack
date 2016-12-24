// api imports
import Ajax from '../folder-ui/lib/api/ajax'
import CrudAjax from '../folder-ui/lib/api/crudajax'
import {
  MongoCodec
} from '../folder-ui/lib/api/codecs'

import URLS from './config/urls'

// apis
const apis = {
  currentuser: CrudAjax({
    name: 'currentuser',
    getUrl: () => URLS.currentuser,
    encode: MongoCodec.encode
  }),
  installation: CrudAjax({
    name: 'installation',
    getUrl: () => URLS.installation,
    encode: MongoCodec.encode
  })
}

export default apis