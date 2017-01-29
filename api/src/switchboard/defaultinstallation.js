"use strict";

// create a 'default' installation when a new account is registered
const async = require('async')

const DefaultInstallation = (controllers) => {

  const installation = controllers.installation

  return (db, query, done) => {

    const accountid = query.accountid

    async.waterfall([

      (next) => {
        installation.create(db, {
          data: 'default',
          accountid
        }, next)
      },
        
      (installationData, next) => {
        installation.activate(db, {
          installationid: installationData.id,
          accountid
        }, next)
      }

    ], done)
  }
}

module.exports = DefaultInstallation