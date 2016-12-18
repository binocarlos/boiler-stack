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

const mongoEndpointFactory = (settings = {}) => {

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
    get:(query = {}) => {
      return ajaxClient
        .get(getUrl())
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
        .put(getUrl(), data)
        .then(result => {
          return codec.encode(result)
        })
    },
    delete:(query = {}) => {
      return ajaxClient
        .delete(getUrl())
    }
  }
}

export default mongoEndpointFactory
