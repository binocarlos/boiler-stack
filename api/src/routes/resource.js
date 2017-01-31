"use strict";
const urlparse = require('url').parse
const async = require('async')

const tools = require('../tools')

function Resources(controllers) {

  const resources = controllers.resource
  const connection = controllers.connection
  const transaction = controllers.transaction

  // QUERIES

  const get = (req, res, error) => {
    resources.get(connection(req.id, req.userid), {
      params: {
        id: req.params.id
      }
    }, tools.jsonCallback(res, error))
  }

  const list = (req, res, error) => {
    resources.list(connection(req.id, req.userid), {
      params: {
        installationid: req.installationid
      }
    }, tools.jsonCallback(res, error))
  }

  // COMMANDS

  const create = (req, res, error) => {
    const parentID = null
    if(req.params.id) {
      parentID = parseInt(req.params.id)
      if(isNaN(parentID)) return error('id was not an int')
    }
    
    transaction(req.id, req.userid, (db, finish) => {
      resources.create(db, {
        params: {
          installationid: req.installationid,
          parentid: parentID
        },
        data: req.body
      }, finish)
    }, tools.jsonCallback(res, error, 201))
  }

  const save = (req, res, error) => {
    const resourceID = parseInt(req.params.id)
    if(isNaN(resourceID)) return error('id was not an int')

    transaction(req.id, req.userid, (db, finish) => {
      resources.save(db, {
        data: req.body,
        params: {
          id: resourceID
        }
      }, finish)
    }, tools.jsonCallback(res, error))
  }

  const del = (req, res, error) => {
    transaction(req.id, req.userid, (db, finish) => {
      resources.delete(db, {
        params: {
          id: req.params.id  
        }
      }, finish)
    }, tools.jsonCallback(res, error))
  }

  return {
    get: get,
    list,
    create,
    save,
    delete: del
  }
}

module.exports = Resources