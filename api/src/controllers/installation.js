"use strict";

const async = require('async')
const tools = require('../tools')
const Installation = require('../models/installation')

const InstallationController = (client, eventBus, InstallationModel) => {
  InstallationModel = InstallationModel || Installation
  
  // queries
  const list = (userid, done) => InstallationModel.byUser(client.query, userid, done)

  // commands
  // query:
  //  * data
  const create = (query, done) => {
    client.transaction((runQuery, finish) => {
      InstallationModel.create(runQuery, query, finish)
    }, (err, result) => {
      if(err) return done(err)
      eventBus.emit('installation.create', {
        query,
        result
      })
      done(null, result)
    })
  }

  return {
    list,
    create
  }
}

module.exports = InstallationController