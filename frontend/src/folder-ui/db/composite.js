/*

  a combination of databases into one tree

  each database has a 'root' node that is a ghost
  we record the '_folderui_rootnode' as a property of every object

  const db = compositeDB({
    dbs:[{
      node:{
        id:'db1',
        name:'My DB 1'
      },
      db:DB1()
    },{
      node:{
        id:'db2',
        name:'My DB 2'
      },
      db:DB2()isRootID
    }]
  })
  
*/

import async from 'async'
import { serialize } from '../tools'

// inject a key that represents what database this item came from
// this lets us save it back to the same place and allows us to combine
// multiple data sources into one tree
const CODEC_KEY = '_folderui_dbname'
const CODEC_DELIMITER = '_'
const ROOT_NODE_ID = 'root'

const extractCodecFromId = (id) => {
  if(!id) return
  let idParts = id.split(CODEC_DELIMITER)
  return idParts.shift()
}

// we either have an object with a [CODEC_KEY]
// or we have a string from the route
export const getItemCodecId = (item) => {
  if(!item) return
  return typeof(item) == 'string' ?
    extractCodecFromId(item) :
    item[CODEC_KEY]
}

export const decodeID = (id) => {
  if(!id) return
  let idParts = id.split(CODEC_DELIMITER)
  idParts.shift()
  return idParts.join(CODEC_DELIMITER)
}

// app -> database
const decode = (item) => {
  if(!item) return item
  if(typeof(item) == 'string') {
    return item.split(CODEC_DELIMITER)[1]
  }
  // we must serialize here because this data cannot be mutated
  // because there are memory pointers into reducer state
  item = serialize(item)
  delete(item[CODEC_KEY])
  if(item.id){
    item.id = decodeID(item.id)  
  }
  return item
}

const codecFactory = (database) => {

  const encodeID = (id) => {
    return database.id + CODEC_DELIMITER + id
  }

  // tells you if this is the root node
  const isRootID = (id) => {
    return id == encodeID(database.id)
  }

  // database -> app
  const encode = (item) => {
    if(!item) return item
    item[CODEC_KEY] = database.id
    item.id = encodeID(item.id)
    item.children = (item.children || []).map((child) => {
      return encode(child)
    })
    return item
  }

  const rootNodeFactory = (extra = {}) => {
    return Object.assign({}, database.rootNode, {
      id:ROOT_NODE_ID
    }, extra)
  }

  const getRootNode = (extra = {}) => {
    return encode(rootNodeFactory(extra))
  }

  // this is loadTree but we return a single node that
  // the async.parallel maps onto the root data array
  const loadTree = (context, done) => {
    database.db.loadTree(context, (err, data) => {
      if(err) return done(err)
      const rootNode = rootNodeFactory({
        children:data || []
      })
      done(null, encode(rootNode))
    })
  }

  const loadChildren = (context, id, done) => {
    id = isRootID(id) ? null : id
    database.db.loadChildren(context, decode(id), (err, data = []) => {
      if(err) return done(err)
      done(null, data.map(encode))
    })
  }

  const loadDeepChildren = (context, id, done) => {
    id = isRootID(id) ? null : id
    database.db.loadDeepChildren(context, decode(id), (err, data = []) => {
      if(err) return done(err)
      done(null, data.map(encode))
    })
  }

  const loadItem = (context, id, done) => {
    id = isRootID(id) ? null : id

    if(isRootID(id)){
      done(null, encode(rootNodeFactory()))
    }
    else{
      database.db.loadItem(context, decodeID(id), (err, data) => {
        if(err) return done(err)
        done(null, encode(data))
      })
    }
    
  }

  const saveItem = (context, id, data, done) => {
    database.db.saveItem(context, decodeID(id), decode(data), (err, data) => {
      if(err) return done(err)
      done(null, encode(data))
    })
  }

  const addItem = (context, parent, item, done) => {
    // the actual database gets passed null as the parent
    // if it's a root node
    parent = isRootID(parent.id) ? null : parent
    database.db.addItem(context, decode(parent), decode(item), (err, data) => {
      if(err) return done(err)
      done(null, encode(data))
    })
  }

  const deleteItem = (context, id, done) => {
    database.db.deleteItem(context, decodeID(id), done)
  }

  return {
    id:database.id,
    database,
    db:database.db,
    encode,
    decode,
    loadTree,
    loadChildren,
    loadDeepChildren,
    loadItem,
    saveItem,
    addItem,
    deleteItem,
    
    getRootNode,

    isRootID
  }
}

const compositedb = (databases = []) => {

  // map database name onto codec for it
  // (the codec contains a ref to the original db for storage)
  const codecs = {}
  databases.forEach((database) => {
    codecs[database.id] = codecFactory(database)
  })

  // use the encoded field to find out what database
  // originated the given item
  const getItemCodec = (item) => {
    return codecs[getItemCodecId(item)]
  }

  return {
    getRootNode:(name, extra = {}) => {
      const codec = codecs[name]
      return codec ?
        codec.getRootNode(extra) :
        null
    },
    loadTree:(done) => {
      // load each of the databases answers
      // then filter each node with a tag for that db
      async.parallel(databases.map((database) => {
        return (next) => {
          const codec = codecs[database.id]
          codec.loadTree(context, next)
        }
      }), done)

    },
    loadChildren:(id, done) => {
      const codec = getItemCodec(id)
      if(!codec) return done('no codec found for: ' + getItemCodecId(id))
      codec.loadChildren(context, id, done)
    },
    loadDeepChildren:(id, done) => {
      const codec = getItemCodec(id)
      if(!codec) return done('no codec found for: ' + getItemCodecId(id))
      codec.loadDeepChildren(context, id, done)
    },
    loadItem:(id, done) => {
      const codec = getItemCodec(id)
      if(!codec) return done('no codec found for: ' + getItemCodecId(id))
      codec.loadItem(context, id, done)
    },
    saveItem:(id, data, done) => {
      const codec = getItemCodec(id)
      if(!codec) return done('no codec found for: ' + getItemCodecId(id))
      codec.db.saveItem(id, data, done)
    },
    addItem:(parentid, data, done) => {
      const codec = getItemCodec(parentid)
      if(!codec) return done('no codec found for: ' + getItemCodecId(parentid))
      parentid = codecisRootID(parentid) ? null : parent
    database.db.addItem(context, decode(parent), decode(item), (err, data) => {
      if(err) return done(err)
      done(null, encode(data))
    })

      codec.db.addItem(parent, item, done)
    },
    deleteItem:(id, done) => {
      const codec = getItemCodec(id)
      if(!codec) return done('no codec found for: ' + getItemCodecId(id))
      codec.db.deleteItem(decodeID(id), done)
    },
    // the wrapper for pasteItems that checks if the paste items are from
    // the same codec source as the parent
    pasteItems:(handler) => {
      return (mode, parent, items, done) => {
        const parentCodec = getItemCodec(parent.id)
        const differentOrigin = items.filter(item => {
          const itemCodec = getItemCodec(item.id)
          return itemCodec.id != parentCodec.id
        }).length > 0

        // this forces the mode to 'copy' if the origins are different
        mode = differentOrigin ? 'copy' : mode
        handler(mode, parent, items, done)
      }
    },
    // loop over each item - get it's codec then use that to map the paste data
    mapPasteData:(mode, item) => {
      const codec = getItemCodec(item.id)
      if(!codec) return done('no codec found for: ' + getItemCodecId(item.id))
      return codec.db.mapPasteData(mode, item)      
    }

  }
}

export default compositedb