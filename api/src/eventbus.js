"use strict";

// event bus to de-couple the system
// we will use redis pub/sub but you can swap that out as long
// as the transport has:
//  * subscribe(channels..., callback(channel, message))
//  * publish(channel, data)
function EventBus(redis) {

  const subscribe = (channel, handler) => redis.subscribe(channel, (channel, message) => {
    handler(message, channel)
  })

  const publish = (channel, data) => redis.publish(channel, data)

  return {
    subscribe,
    publish
  }
}

module.exports = EventBus