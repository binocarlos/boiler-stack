/*

  basic ajax wrapper
  
*/

import axios from 'axios'
import bows from 'bows'

const AjaxRequest = (req = {}) => {

  const logger = bows(req.method + ' ' + req.url)
  
  let reqOpts = {
    method: req.method,
    url: req.url,
    responseType: req.responseType || 'json'
  }

  if(req.data){
    logger('request data', req.data)
    reqOpts.transformRequest = [(data) => JSON.stringify(data)]
    reqOpts.data = req.data
    reqOpts.headers = {
      'Content-Type': 'application/json'
    }
  }

  return axios(reqOpts)
    .then(res => {
      logger(req.method + ' ' + req.url + ' response', {
        method: req.method,
        url: req.url,
        headers: req.headers,
        data: req.data,
        response: res
      })
      return res.data
    }, err => {
      logger(req.method + ' ' + req.url + ' error', {
        method: req.method,
        url: req.url,
        headers: req.headers,
        data: req.data,
        error: err.message,
        stack: err.stack
      })
      throw err
    })
}

export default AjaxRequest