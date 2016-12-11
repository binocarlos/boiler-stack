import waterfall from 'async/waterfall'
import parallel from 'async/parallel'

/*

  a proxy paste handler that

  * load deep children for each clipboard item
  * call mapPasteData for each item
  * call addItem for the paste parent + item
  * if mode is cut - call deleteItem for each item
  
*/

const pasteHandler = (db) => {

  const mapPasteData = (mode, item) => {
    item.children = item.children.map(child => {
      return mapPasteData(mode, child)
    })
    return db.mapPasteData ? db.mapPasteData(mode, item) : item
  }

  return (mode, parentid, items, done) => {

    waterfall([
      (next) => {

        // load each of the paste items deep tree
        parallel(items.map(item => (nextitem) => {
          db.loadDeepChildren(item.id, nextitem)
        }), (err, data) => {
          if(err) return next(err)

          // map the items onto an array where the 'children'
          // property is what we just loaded for that item
          next(null, items.map((item, i) => {

            // return the object via the mapPasteData of the database
            return mapPasteData(mode, Object.assign({}, item, {
              children:data[i]
            }))
          }))

        })
      },

      // fullitems is now an array of paste items with full trees loaded into 'children'
      (fullitems, next) => {

        parallel(fullitems.map(item => (nextitem) => {
          db.addItem(parentid, item, nextitem)
        }), (err) => {
          if(err) return next(err)
          next(null, fullitems)
        })

      },

      // delete the source items if it is a 'cut' operation
      (fullitems, next) => {
        if(mode!='cut') return next()
        parallel(fullitems.map(item => (nextitem) => {
          db.deleteItem(item.id, nextitem)
        }), next)
      }


    ], done)
    
  }
}

export default pasteHandler