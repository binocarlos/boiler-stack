"use strict";
const tools = require('../tools')
const SQL = require('../sql')

const installationList = `select *
from
  "installation"
join
  "collaboration"
on
  "collaboration.installation" = "installation.id"
where
  "collaboration.user" = $1
order by
  "installation.name"
`

const Installation = (db) => {
  const sql = SQL(db, 'installation')
  return {
    list: (userid, done) => sql.raw(installationList, {userid}, done)
  }
}

module.exports = Installation