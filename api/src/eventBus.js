"use strict";

// the simplest event bus
function EventBus() {
  const listeners = []
  const bus = {
    emit: (channel, message) => {
      listeners.forEach(handler => handler(channel, message))
    },
    listen: (handler) => listeners.push(handler)
  }
  return bus
}

module.exports = EventBus