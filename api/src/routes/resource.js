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
    const resourceID = tools.getIdParam(req)
    if(!resourceID) return error('resource id required')
    resources.get(connection(req), {
      params: {
        id: resourceID
      }
    }, tools.jsonCallback(res, error))
  }

  const list = (req, res, error) => {
    resources.list(connection(req), {
      params: {
        installationid: req.installationid
      }
    }, tools.jsonCallback(res, error))
  }

  const children = (req, res, error) => {

    const parentID = tools.getIdParam(req)

    resources.children(connection(req), {
      params: {
        installationid: req.installationid,
        id: parentID
      }
    }, tools.jsonCallback(res, error))
  }

  // COMMANDS

  const create = (req, res, error) => {
    const parentID = tools.getIdParam(req)

    transaction(req, (db, finish) => {
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
    const resourceID = tools.getIdParam(req)
    if(!resourceID) return error('resource id required')

    transaction(req, (db, finish) => {
      resources.save(db, {
        data: req.body,
        params: {
          id: resourceID
        }
      }, finish)
    }, tools.jsonCallback(res, error))
  }

  const del = (req, res, error) => {
    const resourceID = tools.getIdParam(req)
    if(!resourceID) return error('resource id required')
    transaction(req, (db, finish) => {
      resources.delete(db, {
        params: {
          id: resourceID
        }
      }, finish)
    }, tools.jsonCallback(res, error))
  }

  return {
    get: get,
    list,
    children,
    create,
    save,
    delete: del
  }
}

module.exports = Resources