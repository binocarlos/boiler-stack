"use strict";
const tape = require('tape')
const tools = require('../../../testtools')
const InstallationController = require('../../../src/controllers/installation')

const INSTALLATION_ID = 5
const COLLABORATION_ID = 8
const USERID = 10
const INSTALLATION_DATA = {
  name: 'bob'
}
  
const getInstallationData = (data, userid) => {
  return {
    installation: Object.assign({}, data, {
      id: INSTALLATION_ID
    }),
    collaboration: {
      id: COLLABORATION_ID,
      installation: INSTALLATION_ID,
      userid: userid,
    }
  }
}

const INSTALLATION_MODEL = {
  create: () => (data, userid, done) => done(null, getInstallationData(data, userid))
}

const queryStub = (handler, done) => handler({}, done)
const connection = {
  query: queryStub,
  transaction: queryStub
}

tape('controller.installation - create', (t) => {
  const eventBus = tools.eventBus()
  const controller = InstallationController(connection, eventBus, INSTALLATION_MODEL)
  const expectedData = getInstallationData(INSTALLATION_DATA, USERID)
  controller.create(INSTALLATION_DATA, USERID, (err, result) => {
    t.deepEqual(result, expectedData, 'the returned data is correct')
    t.deepEqual(eventBus.getState(), {
      events: [{
        channel: 'installation.create',
        message: {
          query: {
            data: INSTALLATION_DATA,
            userid: USERID
          },
          result
        }
      }]
    }, 'the installation.create event was emitted')

    t.end()
  })
})