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
    trigger: (data) => action(types.trigger, {data})
  }
}

export default TriggerActions