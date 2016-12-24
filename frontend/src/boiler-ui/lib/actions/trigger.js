import {
  action,
  getTypes
} from './tools'

const TriggerActions = (base) => {
  const types = getTypes(base, [
    'TRIGGER'
  ])
  return {
    types,
    trigger: (payload) => action(types.trigger, {payload})
  }
}

export default TriggerActions