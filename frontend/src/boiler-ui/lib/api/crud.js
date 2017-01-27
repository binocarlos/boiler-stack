/*

  common crud methods based on id
  
*/

import deepCheck from 'deep-check-error'

const REQUIRED_SETTINGS = [
  'getUrl',
  'ajaxClient'
]

const crudFactory = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const getUrl = settings.getUrl
  const ajaxClient = settings.ajaxClient
  
  return {
    get:(state) => (query = {}, payload) => {

      const url = getUrl(state)

      query = query || {}
      const url = query.id ?
        getUrl(query) + '/' + query.id :
        getUrl(query)
      return ajaxClient({

      })
        .get(url)
        .then(encode)
    },
    list:(query = {}) => {
      query = query || {}
      const url = query.id ?
        getUrl(query) + '/' + query.id :
        getUrl(query)
      return ajaxClient
        .get(url)
        .then(result => result.map(encode))
    },
    post:(query = {}, payload) => {
      query = query || {}
      return ajaxClient
        .post(getUrl(query), payload)
        .then(encode)
    },
    put:(query = {}, payload) => {
      query = query || {}
      const url = query.id ?
        getUrl(query) + '/' + query.id :
        getUrl(query)
      return ajaxClient
        .put(url, payload)
        .then(encode)
    },
    delete:(query = {}) => {
      query = query || {}
      if(!query.id && !query.ids) throw new Error('no id or ids query given')
      if(query.ids){
        return query.ids.map(id => {
          return ajaxClient
            .delete(getUrl(query) + '/' + id)
        })
      }
      else{
        return ajaxClient
          .delete(getUrl(query) + '/' + query.id)
      }
      
    }
  }
}

export default crudFactory