"use strict";
const urlparse = require('url').parse
const async = require('async')

function Installations(settings) {

  const queries = settings.queries
  const commands = settings.commands

  const list = (req, res, error) => {
    queries.list({id:req.user.id}, (err, items) => {
      if(err) return error(err)
      res.json(items)
    })
  }

  return {
    list
  }
}

module.exports = Auth