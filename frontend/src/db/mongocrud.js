import CrudDB from 'folder-ui/lib/db/crud'

/*

  a CRUD db for folder-ui that knows to encode/decode from to Mongo
  
*/

export default function mongoCrudDB(opts = {}){
  return CrudDB(Object.assign({}, opts, {
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
      Object.keys(opts.inject || {}).forEach(function(key){
        delete(ret[key])
      })
      ret = opts.decode ? opts.decode(ret) : ret
      return ret
    }
  }))
}