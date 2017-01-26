"use strict";

// the simplest event bus
function EventBus() {
  const listeners = []

  const emit = (channel, id, message) => listeners.forEach(handler => handler(channel, id, message))
  const listen = (handler) => listeners.push(handler)

  // wrap the results of a controller command
  // so we log and emit an event
  const emitWrapper = (opts, done) => (err, result) => {
    if(err) {
      opts.logger.error(opts.eventName, opts.tracerid, {
        error: err.toString,
        query: opts.query
      })
      return done(err)
    }
    opts.logger.trace(opts.eventName, opts.tracerid, {
      query: opts.query,
      result
    })
    emit(opts.eventType || 'command', opts.tracerid, {
      name: opts.eventName,
      query: opts.query,
      result
    })
    done(null, result)
  }

  const bus = {
    emit,
    listen,
    emitWrapper
  }

  return bus
}

module.exports = EventBus