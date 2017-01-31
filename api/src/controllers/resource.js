"use strict";

const async = require('async')
const tools = require('../tools')

const ResourceModel = require('../models/resource')

const ResourceController = (eventBus) => {
  
  // queries
  const get = (db, query, done) => ResourceModel.get(db.run, query, done)
  const list = (db, query, done) => ResourceModel.list(db.run, query, done)
  const children = (db, query, done) => ResourceModel.children(db.run, query, done)

  // commands
  //   * params
  //     * installationid
  //   * data
  //     * name
  //     * type
  //     * labels[][]
  //     * meta
  //     * children[resource]
  const create = (db, query, done) => {

    async.waterfall([

      (next) => {
        ResourceModel.create(db.run, query, next)
      },

      (result, next) => {
        eventBus.emit(db, {
          type: 'command',
          channel: 'resource.create',
          query,
          result
        }, next)
      }

    ], done)
    
  }

  // * data
  // * params
  const save = (db, query, done) => {

    async.waterfall([

      (next) => {
        ResourceModel.save(db.run, query, next)
      },

      (result, next) => {
        eventBus.emit(db, {
          type: 'command',
          channel: 'resource.save',
          query,
          result
        }, next)
      }
    ], done)
  }

  const del = (db, query, done) => {

    async.waterfall([

      (next) => {
        ResourceModel.delete(db.run, query, next)
      },

      (result, next) => {
        eventBus.emit(db, {
          type: 'command',
          channel: 'resource.delete',
          query,
          result
        }, next)
      }
    ], done)
    
  }

  return {
    get: get,
    list,
    children,
    create,
    save,
    delete: del
  }
}

module.exports = ResourceController