import Ajax from './ajax'
import MongoCodec from './mongocodec'

const mongoCodecFactory = (name, type) => MongoCodec({
  name:name,
  inject:{
    _type:type
  }
})

const REQUIRED_SETTINGS = [
  'type',
  'title',
  'url',
  'initialFormData'
]

const mongoCrudAjaxFactory = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })
  
  const URL = settings.url
  const TITLE = settings.title
  const TYPE = settings.type

  const ajaxClient = Ajax({
    name:TITLE
  })
  const codec = mongoCodecFactory(TITLE, TYPE)

  return {
    table:{
      get:(query, data) => {
        return ajaxClient
          .get(URL)
          .then(result => {
            return result.map(codec.encode)
          })
      }
    },
    form:{
      get:(query, data) => {
        return ajaxClient
          .get(URL + '/' + query.id)
          .then(result => {
            return codec.encode(result)
          })
      },
      post:(query, data) => {
        return ajaxClient
          .post(URL, data)
          .then(result => {
            return codec.encode(result)
          })
      },
      put:(query, data) => {
        return ajaxClient
          .put(URL + '/' + query.id, data)
          .then(result => {
            return codec.encode(result)
          })
      },
      initialData:(query, data) => {
        return new Promise((resolve, reject) => {
          resolve(settings.initialFormData)
        })
      }
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