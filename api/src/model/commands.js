"use strict";
const tools = require('../tools')
const selectors = require('./selectors')
const single = selectors.single

function Commands(db) {

  const user = {

    create: (user, done) => {
      user = Object.assign({}, user, {
        data: JSON.stringify(user.data || {})
      })
      const insert = tools.insertSQL('user', user)
      db(insert.sql, insert.values, single(done))
    }
  }

  return {
    user
  }
}

module.exports = Commands