"use strict";

const Crud = require('../database/crud')

const getCrud = (client) => Crud(client, 'commandlog')

const create = (connection) => (data, done) => {
  connection((client, finish) => {
    const crud = getCrud(client)
    crud.insert(data, finish)
  }, done)
}

module.exports = {
  create
}