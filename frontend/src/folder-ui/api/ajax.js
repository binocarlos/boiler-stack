/*

  a database implementation that uses ajax
  to speak to a remote REST API
  
*/

import axios from 'axios'
import bows from 'bows'

export default function ajaxdb(opts = {}){

  if(!opts.urls){
    throw new Error('ajax db requires a urls object')
  }

  const urls = opts.urls
  const databaseTitle = opts.title || 'ajax'
  const logger = bows('folder-ui:db:' + databaseTitle)
  logger('urls', urls)

  // turn /children/:id + {id:10} -> /children/10
  const getUrl = (name, params) => {
    if(!opts.urls[name]) throw new Error(name + ' url not found')
    return opts.urls[name].replace(/\/:(\w+?)/g, (match, paramName) => {
      const paramValue = params[paramName]
      return paramValue ? '/' + paramValue : ''
    })
  }

  const httpAPI = (opts = {}) => {
    logger(opts.method.toUpperCase(), url)

    let reqOpts = {
      method: opts.method,
      url: opts.url,
      responseType: 'json'
    }

    if(opts.data){
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