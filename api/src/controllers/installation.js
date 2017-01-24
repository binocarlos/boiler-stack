"use strict";

const async = require('async')
const tools = require('../tools')
const Installation = require('../models/installation')

const InstallationController = (connection, eventBus, InstallationModel) => {
  InstallationModel = InstallationModel || Installation
  
  // queries
  const list = (userid, done) => {
    connection.query((query, finish) => {
      const handler = InstallationModel.byUser(query)
      handler(userid, finish)
    }, done)
  }

  // commands
  const create = (data, userid, done) => {
    connection.transaction((query, finish) => {
      const handler = InstallationModel.create(query)
      handler(data, userid, finish)
    }, (err, result) => {
      if(err) return done(err)
      eventBus.emit('installation.create', {
        query: { data, userid },
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