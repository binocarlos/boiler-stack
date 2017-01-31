"use strict";

const async = require('async')
const tools = require('../tools')

const ToolsModel = require('../models/user')

const ToolsController = (eventBus) => {
  
  // queries

  // get the installation id for a generic entity used for access control
  //
  // * params
  //   * table
  //   * id
  const entityInstallationId = (db, query, done) => {
    ToolsModel.entityInstallationId(db.run, query, done)
  }
  

  return {
    entityInstallationId
  }
}

module.exports = ToolsController