"use strict";
const tools = require('../tools')
const SQL = require('../sql')
const EventEmitter = require('events')

const installationList = `select *
from
  installation
join
  collaboration
on
  (collaboration.installation = installation.id)
where
  collaboration.useraccount = $1
order by
  installation.name
`

const Installation = (db) => {
  const sql = SQL(db, 'installation')
  const installation = new EventEmitter()

  const list = (userid, done) => sql.raw(installationList, [userid], done)

  installation.list = list

  return installation
}

module.exports = Installation