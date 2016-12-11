import Ajax from './ajax'
import MongoCodec from './mongocodec'

const mongoCodecFactory = (type) => MongoCodec({
  inject:{
    _type:type
  }
})

const REQUIRED_SETTINGS = [
  'type',
  'title',
  'apiUrl',
  'initialFormData'
]

const mongoCrudAjaxFactory = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })
  
  const API_URL = settings.apiUrl
  const TITLE = settings.title
  const TYPE = settings.type

  const ajaxClient = Ajax({
    name:TITLE
  })
  const codec = mongoCodecFactory(TYPE)

  return {
    table:{
      get:(query, data) => {
        return ajaxClient
          .get(API_URL)
          .then(result => {
            return result.map(codec.encode)
          })
      }
    },
    form:{
      get:(query, data) => {
        return new Promise((resolve, reject) => {
          resolve()
        })
      },
      post:(query, data) => {
        return new Promise((resolve, reject) => {
          resolve()
        })
      },
      put:(query, data) => {
        return new Promise((resolve, reject) => {
          resolve()
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