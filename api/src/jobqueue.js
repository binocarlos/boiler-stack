"use strict";

const RedisSMQ = require('rsmq')
const RedisSMQWorker = require('rsmq-worker')

const NAMESPACE = 'jobqueue'

const Logger = require('./logger')

const logger = Logger('jobqueue')

// job queue to de-couple the system
// it is redis backed - we expose an api of
//  
//   * worker(qname, handler(err, job, done))
//   * boss(qname) => (job)
//
function JobQueue(redis) {

  const rsmq = new RedisSMQ({
    client: redis,
    ns: NAMESPACE
  })

  const worker = (qname, handler) => {
    const theWorker = new RedisSMQWorker(qname, {
      redis,
      redisPrefix: NAMESPACE
    })

    theWorker.on( 'message', ( msg, next, id ) => {
      handler(null, job, next, id)
    })

    theWorker.on('error', ( err, msg ) => handler(err))
    theWorker.on('exceeded', ( err, msg ) => handler('exceeded'))
    theWorker.on('timeout', ( err, msg ) => handler('timeout'))

    return theWorker
  }

  const create = (qname) => {
    rsmq.createQueue({
      qname
    }, (err, resp) => {
      if(err) {
        logger.error(err)
      }
      else {
        logger({
          message: 'jobqueue: ' + qname + ' created'
        })
      }
    })
    return (job, done) => {
      rsmq.sendMessage({
        message: job,
        qname
      }, (err, resp) => {
        if(err) {
          logger.error(err)
          done && done(err)
        }
        else {
          logger({
            message: 'job created',
            job
          })
          done && done()
        }
      })
    }
  }

  return {
    worker,
    create
  }
}

module.exports = JobQueue