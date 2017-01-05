"use strict";

const packageInfo = require('../../package.json')

function Version(settings) {
  return (req, res) => {
    res.send(packageInfo.version)
  }
}

module.exports = Version