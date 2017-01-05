"use strict";
const tools = require('../tools')
const selectors = require('./selectors')
const single = selectors.single

function Queries(db) {

  const user = {

    email: (email, done) => {
      db(`select * from "user" where "email" = $1;`, [email], single(done))
    },

    id: (id, done) => {
      db(`select * from "user" where "id" = $1;`, [id], single(done))
    }

  }

  return {
    user
  }
}

module.exports = Queries