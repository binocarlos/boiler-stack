/*

  a database implementation that uses ajax
  to speak to a remote REST API
  
*/

import axios from 'axios'
import bows from 'bows'

export default function ajaxdb(opts = {}){

  if(!opts.urls){
    throw new Error('ajax db requires a urls object')
  }

  const urls = opts.urls
  const databaseTitle = opts.title || 'ajax'
  const logger = bows('folder-ui:db:' + databaseTitle)
  logger('urls', urls)

  // turn /children/:id + {id:10} -> /children/10
  const getUrl = (name, params) => {
    if(!opts.urls[name]) throw new Error(name + ' url not found')
    return opts.urls[name].replace(/\/:(\w+?)/g, (match, paramName) => {
      const paramValue = params[paramName]
      return paramValue ? '/' + paramValue : ''
    })
  }

  return {
    loadTree:(done) => {

      superagent
        .get(urls.loadTree(getBaseUrl(context), context.search))
        .set('Accept', 'application/json')
        .end((err, res) => {
          if(res.status>=400){
            done && done(res.body)
          }
          else{
            done && done(null, res.body)
          }
        })
    },
    loadChildren:(id, done) => {
      superagent
        .get(urls.loadChildren(getBaseUrl(context), id))
        .set('Accept', 'application/json')
        .end((err, res) => {
          if(res.status>=400){
            done && done(res.body)
          }
          else{
            done && done(null, res.body)
          }
        })
    },
    loadDeepChildren:(id, done) => {
      superagent
        .get(urls.loadDeepChildren(getBaseUrl(context), id))
        .set('Accept', 'application/json')
        .end((err, res) => {
          if(res.status>=400){
            done && done(res.body)
          }
          else{
            done && done(null, res.body)
          }
        })
    },
    loadItem:(id, done) => {
      superagent
        .get(urls.loadItem(getBaseUrl(context), id))
        .set('Accept', 'application/json')
        .end((err, res) => {
          if(res.status>=400){
            done && done(res.body)
          }
          else{
            done && done(null, res.body)
          }
        })
    },
    addItem:(parentid, item, done) => {
      if(opts.readOnly) return done('this database is readonly')
      superagent
        .post(urls.addItem(getBaseUrl(context), parent ? parent.id : null))
        .send(JSON.stringify(item))
        .set('Accept', 'application/json')
        .end((err, res) => {
          if(res.status>=400){
            done && done(res.body)
          }
          else{
            done && done(null, res.body)
          }
        })
    },
    saveItem:(id, data, done) => {
      if(opts.readOnly) return done('this database is readonly')
      superagent
        .put(urls.saveItem(getBaseUrl(context), id))
        .send(JSON.stringify(data))
        .set('Accept', 'application/json')
        .end((err, res) => {
          if(res.status>=400){
            done && done(res.body)
          }
          else{
            done && done(null, res.body)
          }
        })
    },
    
    deleteItem:(id, done) => {
      if(opts.readOnly) return done('this database is readonly')
      superagent
        .delete(urls.deleteItem(getBaseUrl(context), id))
        .set('Accept', 'application/json')
        .end((err, res) => {
          if(res.status>=400){
            done && done(res.body)
          }
          else{
            done && done(null, res.body)
          }
        })
    },

    mapPasteData:(mode, item) => {
      return item
    }
    
  }
}