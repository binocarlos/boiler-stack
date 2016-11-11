import superagent from 'superagent'
import MemoryDB from 'folder-ui/lib/db/memory'
import urls from './urls'

import {
  getCurrentProject
} from '../tools'

/*

  a database that represents the current quote in memory
  so we can use folder-ui to edit it
  
*/

export default function QuoteDB(opts = {}){

  let db = MemoryDB()
  let activeQuoteID = null

  // has the quote changed?
  const shouldReloadQuoteData = (id) => {
    return id != activeQuoteID
  }

  const loadQuoteData = (projectid, quoteid, done) => {
    superagent
      .get(urls.quotes + '/' + projectid + '/' + quoteid)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(res.status>=500) return done(res.body)
        done(null, res.body)
      })
  }

  return {
    loadTree:(context, done) => {
      const quoteid = context.params.quoteid

      const projectid = getCurrentProject(state)
      const state = context.state

      const combinedId = projectid + '_' + quoteid

      if(combinedId==activeQuoteID) return db.loadTree(context, done)
      
      loadQuoteData(projectid, quoteid, (err, data) => {
        if(err) return done(err)
        activeQuoteID = combinedId
        db = MemoryDB(data)
        db.loadTree(context, done)
      })
    },
    loadChildren:(context, id, done) => {
      
    },
    loadDeepChildren:(context, id, done) => {
      
    },
    loadItem:(context, id, done) => {
      
    },
    addItem:(context, parent, item, done) => {
      
    },
    saveItem:(context, id, data, done) => {
      
    },
    
    deleteItem:(context, id, done) => {
      
    },

    filterPaste:(mode, item) => {
      return item
    }
    
  }
}