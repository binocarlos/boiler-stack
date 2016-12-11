/*

  encode / decode for items from mongo
  
*/

export default function MongoCodec(opts = {}){
  return {
    encode:(data) => {
      let ret = Object.assign({}, data, opts.inject, {
        id:data._id
      })
      ret = opts.encode ? opts.encode(ret) : ret
      return ret
    },
    decode:(data) => {
      let ret = Object.assign({}, data)
      delete(ret.id)
      Object.keys(opts.inject || {}).forEach((key) => {
        delete(ret[key])
      })
      ret = opts.decode ? opts.decode(ret) : ret
      return ret
    }
  }
}