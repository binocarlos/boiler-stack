import Ajax from './ajax'

const crudAjaxFactory = (settings = {}) => {

  const getUrl = (query) => {
    return settings.getUrl ?
      settings.getUrl(query) :
      settings.url
  }

  const ajaxClient = Ajax({
    name:settings.name
  })
  
  const encode = settings.encode ?
    settings.encode :
    (data) => data

  return {
    get:(query = {}) => {
      query = query || {}
      const url = query.id ?
        getUrl(query) + '/' + query.id :
        getUrl(query)
      return ajaxClient
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
    post:(query = {}, data) => {
      query = query || {}
      return ajaxClient
        .post(getUrl(query), data)
        .then(encode)
    },
    put:(query = {}, data) => {
      query = query || {}
      const url = query.id ?
        getUrl(query) + '/' + query.id :
        getUrl(query)
      return ajaxClient
        .put(url, data)
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

export default crudAjaxFactory