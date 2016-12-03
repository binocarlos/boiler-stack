import axios from 'axios'
import bows from 'bows'

const logger = bows('passport:api')

const getAPI = url => {

  logger('getAPI:request', url)

  return axios
    .get(url, {
      responseType: 'json'
    })
    .then(res => {
      logger('getAPI:response', res.status, res.data)
      return {
        loggedIn:res.data.loggedIn,
        user:res.data.data
      }
    }, err => {
      logger('getAPI:response:error', err)
      return err
    })
}

const postAPI = (url, data) => {

  logger('postAPI:request', url, data)

  return axios
    .post(url, data, {
      responseType: 'json',
      requestType: 'json'
    })
    .then(res => {
      logger('postAPI:response', url, res.status, res.data)
      return res.data
    }, err => {
      logger('postAPI:response:error', err)
      return err
    })
}

const status = url => getAPI(url)
const login = (url, data) => postAPI(url, data)
const register = (url, data) => postAPI(url, data)

const api = {
  status,
  login,
  register
}

export default api