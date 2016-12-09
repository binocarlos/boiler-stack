/*

  a database implementation that uses ajax
  to speak to a remote REST API
  
*/

import axios from 'axios'
import bows from 'bows'

export default function ajaxdb(opts = {}){

  const getLogger = (method, url) => bows('folderui:api:' + (opts.name || 'ajax') + ' ' + method + ' ' + url)

  const httpAPI = (req = {}) => {
    const logger = getLogger(req.method.toUpperCase(), req.url)

    let reqOpts = {
      method: req.method,
      url: req.url,
      responseType: 'json'
    }

    if(req.data){
      logger('request data', req.data)
      reqOpts.responseType = 'json'
      reqOpts.transformRequest = [(data) => JSON.stringify(data)]
    }

    return axios(reqOpts)
      .then(res => {
        logger('response', res.status, res.data)
        return res.data
      }, err => {
        logger('error', err.message)
        throw err
      }) 
  }

  return {
    get:url => {
      return httpAPI({
        method:'get',
        url
      })
    },
    post:(url, data) => {
      return httpAPI({
        method:'get',
        url,
        data
      })
    },
    put:(url, data) => {
      return httpAPI({
        method:'put',
        url,
        data
      })
    },
    delete:url => {
      return httpAPI({
        method:'delete',
        url
      })
    }
  }
}