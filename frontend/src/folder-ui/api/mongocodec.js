/*

  encode / decode for items from mongo
  
*/

import bows from 'bows'

export default function MongoCodec(opts = {}){
  const logger = bows('folderui:api:mongocodec' + (opts.name ? ':' + opts.name : ''))
  return {
    encode:(data) => {
      let ret = Object.assign({}, data, opts.inject, {
        id:data._id
      })
      ret = opts.encode ? opts.encode(ret) : ret
      logger('encode', data, ret)
      return ret
    },
    decode:(data) => {
      let ret = Object.assign({}, data)
      delete(ret.id)
      Object.keys(opts.inject || {}).forEach((key) => {
        delete(ret[key])
      })
      ret = opts.decode ? opts.decode(ret) : ret
      logger('decode', data, ret)
      return ret
    }
  }
}