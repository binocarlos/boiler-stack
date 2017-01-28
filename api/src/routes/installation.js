"use strict";
const urlparse = require('url').parse
const async = require('async')

const tools = require('../tools')

function Installations(controllers) {

  const installations = controllers.installation
  const connection = controllers.connection
  const transaction = controllers.transaction

  const get = (req, res, error) => {
    installations.get(connection(req.id, req.userid), {
      id: req.params.id
    }, tools.jsonCallback(res, error))
  }

  const list = (req, res, error) => {
    installations.list(connection(req.id, req.userid), {
      accountid: req.user.id
    }, tools.jsonCallback(res, error))
  }

  const create = (req, res, error) => {
    transaction(req.id, req.userid, (db, finish) => {
      installations.create(db, {
        accountid: req.user.id,
        data: req.body
      }, finish)
    }, tools.jsonCallback(res, error, 201))
  }

  const save = (req, res, error) => {
    const installationID = parseInt(req.params.id)
    if(isNaN(installationID)) return error('id was not an int')

    transaction(req.id, req.userid, (db, finish) => {
      installations.save(db, {
        data: req.body,
        params: {
          id: installationID
        }
      }, finish)
    }, tools.jsonCallback(res, error))
  }

  const activate = (req, res, error) => {

    // we are writing JSON data so lets write the id as the int
    // that it is
    const installationID = parseInt(req.params.id)
    if(isNaN(installationID)) return error('id was not an int')

    transaction(req.id, req.userid, (db, finish) => {
      installations.activate(db, {
        installationid: installationID,
        accountid: req.user.id
      }, finish)
    }, tools.jsonCallback(res, error))
  }

  const del = (req, res, error) => {
    transaction(req.id, req.userid, (db, finish) => {
      installations.delete(db, {
        id: req.params.id
      }, finish)
    }, tools.jsonCallback(res, error))
  }

  return {
    get: get,
    list,
    create,
    save,
    activate,
    delete: del
  }
}

module.exports = Installations