// api imports
import Ajax from '../folder-ui/lib/api/ajax'
import CrudAjax from '../folder-ui/lib/api/crudajax'
import {
  MongoCodec
} from '../folder-ui/lib/api/codecs'

import urls from './config/urls'

// apis
const apis = {
  currentuser: CrudAjax({
    name: 'currentuser',
    getUrl: () => urls.currentuser,
    encode: MongoCodec.encode
  }),
  installation: CrudAjax({
    name: 'installation',
    getUrl: () => urls.installation,
    encode: MongoCodec.encode
  })
}

export default apis