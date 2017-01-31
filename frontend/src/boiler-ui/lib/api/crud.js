import axios from 'axios'
import bows from 'bows'
import Ajax from './ajax'

const List = (query) => {
  return {
    method: 'get',
    url: ''
  }
}

const Get = (query) => {
  return {
    method: 'get',
    url: '/' + query.params.id
  }
}


const Post = (query) => {
  return {
    method: 'post',
    url: '',
    data: query.data
  }
}

const Put = (query) => {
  return {
    method: 'put',
    url: '/' + query.params.id,
    data: query.data
  }
}

const SingleDelete = (id) => {
  return {
    method: 'delete',
    url: '/' + id
  }
}

const Delete = (query) => { 
  return query.params.ids ?
    query.params.ids.map(SingleDelete) :
    SingleDelete(query.params.id)
}

// handles input of array or single
// and returns array of ajax promises or single
// the requestFactory originates the request (list,get,post,put,delete)
// the map function alters request properties before it is run
const Runner = (requestFactory, mapRequest) => query => {
  const rawRequest = requestFactory(query)
  const isArray = rawRequest.constructor === Array

  const mappedRequest = isArray ?
    rawRequest.map(r => mapRequest(r, query)) :
    mapRequest(rawRequest, query)

  return isArray ?
    mappedRequest.map(Ajax) :
    Ajax(mappedRequest)
}

const Crud = (map, extras) => {
  return Object.assign({}, {
    list: Runner(List, map),
    get: Runner(Get, map),
    post: Runner(Post, map),
    put: Runner(Put, map),
    delete: Runner(Delete, map)
  }, extras)
}

export default Crud