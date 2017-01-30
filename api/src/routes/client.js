"use strict";
const urlparse = require('url').parse
const async = require('async')

const tools = require('../tools')

function Clients(controllers) {

  const clients = controllers.client
  const connection = controllers.connection
  const transaction = controllers.transaction

  // QUERIES

  const get = (req, res, error) => {
    clients.get(connection(req.id, req.userid), {
      id: req.params.id,
      installationid: req.installationid
    }, tools.jsonCallback(res, error))
  }

  const list = (req, res, error) => {
    clients.list(connection(req.id, req.userid), {
      installationid: req.installationid
    }, tools.jsonCallback(res, error))
  }

  // COMMANDS

  const create = (req, res, error) => {
    transaction(req.id, req.userid, (db, finish) => {
      clients.create(db, {
        installationid: req.installationid,
        data: req.body
      }, finish)
    }, tools.jsonCallback(res, error, 201))
  }

  const save = (req, res, error) => {
    const clientID = parseInt(req.params.id)
    if(isNaN(clientID)) return error('id was not an int')

    transaction(req.id, req.userid, (db, finish) => {
      clients.save(db, {
        data: req.body,
        params: {
          id: clientID
        }
      }, finish)
    }, tools.jsonCallback(res, error))
  }

  const del = (req, res, error) => {
    transaction(req.id, req.userid, (db, finish) => {
      clients.delete(db, {
        id: req.params.id
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

module.exports = Clients