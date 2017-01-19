"use strict";
const urlparse = require('url').parse
const async = require('async')

function Installations(model) {

  const list = (req, res, error) => {
    model.list(req.user.id, (err, items) => {
      if(err) return error(err)
      res.json(items)
    })
  }

  return {
    list
  }
}

module.exports = Installations