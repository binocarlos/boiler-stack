import axios from 'axios'
import bows from 'bows'

const getAPI = url => {

  const logger = bows('passport:api GET ' + url)

  return axios({
    method: 'get',
    url: url,
    responseType: 'json'
  })
    .then(res => {
      logger('response', res.status, res.data)
      return {
        loggedIn:res.data.loggedIn,
        user:res.data.data
      }
    }, err => {
      logger('error', err.message)
      throw err
    })
}

const postAPI = (url, data) => {

  const logger = bows('passport:api POST ' + url)

  logger('data', data)

  return axios({
    method: 'post',
    url: url,
    data: data,
    responseType: 'json',
    transformRequest: [(data) => JSON.stringify(data)]
  })
    .then(res => {
      logger('response', res.status, res.data)
      return res.data
    }, (err) => {
      if (err.response && err.response.data) {
        err.message = err.response.data.error
      }
      logger('error', err.message)
      throw err
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