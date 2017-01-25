"use strict";
const urlparse = require('url').parse
const async = require('async')

function Installations(controllers) {

  const installations = controllers.installation

  const list = (req, res, error) => {
    installations.list(req.id, {
      userid: req.user.id
    }, (err, items) => {
      if(err) return error(err)
      res.json(items)
    })
  }

  return {
    list
  }
}

module.exports = Installations