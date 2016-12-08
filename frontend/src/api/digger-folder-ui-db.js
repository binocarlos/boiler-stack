/*

  a folder-ui AJAX database implementation that maps data
  from the REST api (index.js)
  
*/

// db is an existing folder-ui database implementation
export default function diggerdb(db, opts = {}){

  // database -> reducer
  const encode = (data) => {
    data.id = data._digger.diggerid
    return data
  }

  // reducer -> database
  const decode = (data) => {
    delete(data.id)
    return data
  }

  const cutProcessor = (data) => {
    delete(data._digger.path)
    data._children = (data._children || []).map(cutProcessor)
    return data
  }

  const copyProcessor = (data) => {
    delete(data._digger.inode)
    delete(data._digger.path)
    delete(data._digger.diggerid)
    delete(data._digger.created)
    data._children = (data._children || []).map(copyProcessor)
    return data
  }

  // turn a backend digger tree result (which is a flat list)
  // into a frontend folder-ui tree (which is a nested tree)
  const processTreeData = (data) => {
    
    // make a map of _digger.path and _digger.inode
    var pathMap = {}
    var rootNodes = []

    data = data.map(function(item){
      // give each node a proper id (based on _digger.diggerid)
      item = encode(item)
      pathMap[item._digger.path + '/' + item._digger.inode] = item
      return item
    })

    Object.keys(pathMap || {}).forEach(function(path){

      var item = pathMap[path]
      var parts = path.split('/')
      var inode = parts.pop()
      var parentPath = parts.join('/')
      var parent = pathMap[parentPath]

      // it's a root node
      if(!parent){
        rootNodes.push(item)
      }
      // we have a parent
      else{
        var children = parent.children || []
        children.push(item)
        parent.children = children
      }

    })

    return rootNodes
  }

  return {
    loadTree:(done) => {
      db.loadTree((err, data) => {
        if(err) return done(err)
        done(null, processTreeData(data))
      })
    },
    loadChildren:(id, done) => {
      db.loadChildren(id, (err, data) => {
        if(err) return done(err)
        done(null, data.map(encode))
      })
    },
    loadDeepChildren:(id, done) => {
      db.loadDeepChildren(id, (err, data) => {
        if(err) return done(err)
        done(null, processTreeData(data))
      })
    },
    loadItem:(id, done) => {
      db.loadItem(id, (err, data) => {
        if(err) return done(err)
        done(null, encode(data))
      })
    },
    addItem:(parentid, item, done) => {
      db.addItem(parentid, decode(Object.assign({}, item)), done)
    },
    saveItem:(id, data, done) => {
      db.saveItem(id, decode(Object.assign({}, data)), done)
    },
    deleteItem:(id, done) => {
      db.deleteItem(id, done)
    }
  }

}