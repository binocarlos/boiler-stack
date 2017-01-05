"use strict";

const Queries = require('./queries')
const Commands = require('./commands')

const Model = (databases) => {
  const queries = {
    user: Queries.user(databases.postgres),
    installation: Queries.installation(databases.postgres),
  }

  const commands = {
    user: Commands.user(databases.postgres),
    installation: Commands.installation(databases.postgres),
  }

  return {
    queries,
    commands
  }
}