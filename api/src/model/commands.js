"use strict";
const tools = require('../tools')
const selectors = require('./selectors')
const single = selectors.single

function Commands(db) {

  const user = {

    create: (user, done) => {
      const userRecord = tools.generateUser(user)
      const insert = tools.insertSQL('user', userRecord)
      db(insert.sql, insert.values, single(done))
    },

    update: (id, data, done) => {
      const update = tools.updateSQL('user', {
        data: JSON.stringify(data)
      }, `"id" = $1`, [id])
      db(update.sql, update.values, single(done))
    }
  }

  return {
    user
  }
}

module.exports = Commands