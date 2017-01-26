"use strict";
const urlparse = require('url').parse
const async = require('async')

const tools = require('../tools')

function Installations(controllers) {

  const installations = controllers.installation
  const connection = controllers.connection
  const transaction = controllers.transaction

  const get = (req, res, error) => {
    installations.get(connection(req.id), {
      id: req.params.id
    }, tools.jsonCallback(res, error))
  }

  const list = (req, res, error) => {
    installations.list(connection(req.id), {
      userid: req.user.id
    }, tools.jsonCallback(res, error))
  }

  const create = (req, res, error) => {
    transaction(req.id, (db, finish) => {
      installations.create(db, {
        userid: req.user.id,
        data: req.body
      }, finish)
    }, tools.jsonCallback(res, error, 201))
  }

  const save = (req, res, error) => {
    transaction(req.id, (db, finish) => {
      installations.save(db, {
        data: req.body,
        params: {
          id: req.params.id  
        }
      }, finish)
    }, tools.jsonCallback(res, error))
  }

  const del = (req, res, error) => {
    transaction(req.id, (db, finish) => {
      installations.delete(req.id, {
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

module.exports = Installations