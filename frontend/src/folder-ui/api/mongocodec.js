/*

  encode / decode for items from mongo
  
*/

import bows from 'bows'

export default function MongoCodec(opts = {}){
  const logger = bows('folderui:api:mongocodec' + (opts.name ? ':' + opts.name : ''))
  return {
    encode:(data) => {
      let ret = Object.assign({}, data, {
        id:data._id
      })
      delete(ret._id)
      delete(ret.__v)
      return ret
    },
    decode:(data) => {
      let ret = Object.assign({}, data)
      ret._id = ret.id
      delete(ret.id)
      return ret
    }
  }
}