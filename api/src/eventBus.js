"use strict";

// the simplest event bus
function EventBus() {
  const listeners = []
  const bus = {
    emit: (channel, id, message) => listeners.forEach(handler => handler(channel, id, message)),
    listen: (handler) => listeners.push(handler)
  }
  return bus
}

module.exports = EventBus