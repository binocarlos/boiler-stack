/*

  a crude in-memory implementation of the folder-ui database library
  
*/

import { serialize } from '../tools'
import { 
  processTreeData,
  dumpTreeData,
  getChildren,
  getDeepChildren,
  addChild,
  moveItem,
  deleteItem
} from './apitools'

export default function memorydb(opts = {}){

  let tree = processTreeData(opts.data)

  const commit = (done) => {
    if(!opts.commit) return done()
    opts.commit(tree, (err) => {
      if(err) return done(err)
      return done()
    })
  }

  // commit the initial data
  commit(null, null, () => {})

  return {
    loadTree:(done) => {
      return new Promise(function(resolve, reject) {
        resolve(serialize(dumpTreeData(tree)))
      })
    },
    loadChildren:(id, done) => {
      return new Promise(function(resolve, reject) {
        resolve(serialize(getChildren(tree, id)))
      })
    },
    loadDeepChildren:(id, done) => {
      return new Promise(function(resolve, reject) {
        resolve(serialize(getDeepChildren(tree, id)))
      })
    },
    loadItem:(id, done) => {
      return new Promise(function(resolve, reject) {
        resolve(serialize(tree.data[id]))
      })
    },
    addItem:(parentid, item, done) => {
      return new Promise(function(resolve, reject) {
        let parent = tree.data[id]
        item = serialize(item)
        tree = addChild(tree, parent, item)
        commit((err) => {
          if(err) return reject(err)
          resolve(serialize(item))
        })
      })
    },
    saveItem:(id, data, done) => {
      return new Promise(function(resolve, reject) {
        data = serialize(data)
        let saveitem = tree.data[id]
        Object.keys(data || {}).forEach(function(key){
          saveitem[key] = data[key]
        })
        commit((err) => {
          if(err) return reject(err)
          resolve(serialize(saveitem))
        })
      })
    },
    deleteItem:(id, done) => {
      return new Promise(function(resolve, reject) {
        deleteItem(tree, id)
        commit((err) => {
          if(err) return reject(err)
          resolve()
        })
      })
    }
  }
}