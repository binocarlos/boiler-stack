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
  'title',
  'url'
]

const mongoEndpointFactory = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })
  
  const url = settings.url
  const title = settings.title
  const type = settings.type

  const ajaxClient = Ajax({
    name:title
  })
  const codec = mongoCodecFactory(title, type)

  return {
    get:(query = {}) => {
      return ajaxClient
        .get(url)
        .then(result => {
          return codec.encode(result)
        })
    },
    post:(query = {}, data) => {
      return ajaxClient
        .post(url, data)
        .then(result => {
          return codec.encode(result)
        })
    },
    put:(query = {}, data) => {
      return ajaxClient
        .put(url, data)
        .then(result => {
          return codec.encode(result)
        })
    },
    delete:(query = {}) => {
      return ajaxClient
        .delete(url)
    }
  }
}

export default mongoEndpointFactory
