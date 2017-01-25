"use strict";
const urlparse = require('url').parse
const async = require('async')

function Installations(controller) {

  const list = (req, res, error) => {
    controller.list(req.id, {
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