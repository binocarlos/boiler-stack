import Ajax from './ajax'
import { MongoCodec } from './codecs'

const mongoCodecFactory = (name, type) => MongoCodec({
  name:name,
  inject:{
    _type:type
  }
})

const REQUIRED_SETTINGS = [
  'type',
  'title'
]

const mongoCrudAjaxFactory = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  const title = settings.title
  const type = settings.type

  const getUrl = () => {
    return settings.getUrl ?
      settings.getUrl() :
      settings.url
  }

  const ajaxClient = Ajax({
    name:title
  })
  const codec = mongoCodecFactory(title, type)

  return {
    list:(query = {}) => {
      return ajaxClient
        .get(getUrl())
        .then(result => {
          return result.map(codec.encode)
        })
    },
    get:(query = {}) => {
      return ajaxClient
        .get(getUrl() + '/' + query.id)
        .then(result => {
          return codec.encode(result)
        })
    },
    post:(query = {}, data) => {
      return ajaxClient
        .post(getUrl(), data)
        .then(result => {
          return codec.encode(result)
        })
    },
    put:(query = {}, data) => {
      return ajaxClient
        .put(getUrl() + '/' + query.id, data)
        .then(result => {
          return codec.encode(result)
        })
    },
    delete:(query = {}) => {
      return ajaxClient
        .delete(getUrl() + '/' + query.id)
    }
  }
}

export default mongoCrudAjaxFactory

// the raw apis for each database
/*
export const apis = {
  
  coreresources:DiggerDB({
    readOnly: true,
    // this database speaks to the core system
    baseurl:(context) => {
      return '/api/v1/digger/core/resources'
    }
  }),
  userresources:DiggerDB({
    // what backend api url do we use depends upon the current project
    baseurl:(context) => {
      const projectID = getCurrentProject(context.state)
      return '/api/v1/digger/' + projectID + '/resources'
    }
  }),
  projects:MongoCrudDB({
    baseurl:'/api/v1/projects',
    inject:{
      _type:'project'
    }
  }),
  accounts:MongoCrudDB({
    baseurl:'/api/v1/accounts',
    inject:{
      _type:'account'
    }
  }),
  clients:MongoCrudDB({
    baseurl:(context) => {
      const projectID = getCurrentProject(context.state)
      return '/api/v1/clients/' + projectID
    },
    inject:{
      _type:'client'
    }
  }),
  quotes:MongoCrudDB({
    baseurl:(context) => {
      const projectID = getCurrentProject(context.state)
      return '/api/v1/quotes/' + projectID
    },
    inject:{
      _type:'quote'
    }
  })

  accounts:MongoCrudDB({
    baseurl:'/api/v1/accounts',
    inject:{
      _type:'account'
    }
  })

}*/