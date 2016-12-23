import Ajax from './ajax'

const crudAjaxFactory = (settings = {}) => {

  const getUrl = () => {
    return settings.getUrl ?
      settings.getUrl() :
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
      const url = query.id ?
        getUrl() + '/' + query.id :
        getUrl()
      return ajaxClient
        .get(url)
        .then(result => {
          return query.id ?
            encode(result) :
            result.map(encode)
        })
    },
    post:(query = {}, data) => {
      return ajaxClient
        .post(getUrl(), data)
        .then(result => {
          return encode(result)
        })
    },
    put:(query = {}, data) => {
      if(!query.id) throw new Error('no id query given')
      return ajaxClient
        .put(getUrl() + '/' + query.id, data)
        .then(result => {
          return encode(result)
        })
    },
    delete:(query = {}) => {
      if(!query.id && !query.ids) throw new Error('no id or ids query given')
      if(query.ids){
        return query.ids.map(id => {
          return ajaxClient
            .delete(getUrl() + '/' + id)
        })
      }
      else{
        return ajaxClient
          .delete(getUrl() + '/' + query.id)
      }
      
    }
  }
}

export default crudAjaxFactory