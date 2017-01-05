"use strict";
const tools = require('../tools')
const selectors = require('./selectors')
const single = selectors.single

function Queries(db) {

  const user = {

    login: (email, password, done) => {
      db(`select * from "user" where "email" = $1;`, [email], single((err, user) => {
        if(err) return done(err)
        return tools.checkUserPassword(user, password) ?
          done(null, user) :
          done()
      }))
    },

    load: (id, done) => {
      db(`select * from "user" where "id" = $1;`, [id], single(done))
    }

  }

  return {
    user
  }
}

module.exports = Queries