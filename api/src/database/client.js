"use strict";

const Logger = require('../logger')
const Connection = require('./connection')
const Transaction = require('./transaction')

const logger = Logger('client')

// returns an api with:
//  * query({sql,params}, done)        - one off query, client returned automatically    
//  * connection(handler, done)        - all queries via same client - manual return
//  * transaction(handler, done)       - connection wrapped in BEGIN/COMMIT/ROLLBACK
// 
// handler(query, done)                - query is same ({sql,params},done)
const Client = (postgres) => {
  const query = postgres.query
  const connection = Connection(postgres)
  const transaction = Transaction(connection)

  return {
    query,
    connection,
    transaction
  }
}

module.exports = Client