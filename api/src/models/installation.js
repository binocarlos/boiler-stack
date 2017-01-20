"use strict";
const tools = require('../tools')
const SQL = require('../sql')
const EventEmitter = require('events')
const async = require('async')

// join the installations table to the
// collaborations the user has
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

// an installation is always created by the owner
// insert a collaboration alongside the installation for this
const createInstallation = `BEGIN;
insert into installation
(
  name
)
values
(
  %L
);
insert into collaboration 
(
  useraccount,
  installation,
  permission
)
values
(
  %L,
  lastval(),
  'owner'
);
COMMIT;
`

const Installation = (db) => {
  const sql = SQL(db, 'installation')
  const installation = new EventEmitter()

  const list = (userid, done) => sql.raw(installationList, [userid], done)

  
  const create = (name, userid, done) => {
    const client = null
    const closeConnection = null
    async.series([
      (next) => db.getConnection((err, c, close) => {
        if(err) return next(err)
        client = c
        closeConnection = close
        next()
      }),

      (next) => {

      }

    ], (err, user) => {

    })
    sql.escapeRaw(createInstallation, [name, userid], done)
  }

  installation.list = list
  installation.create = create

  return installation
}

module.exports = Installation