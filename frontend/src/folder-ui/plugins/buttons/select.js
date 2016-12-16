const REQUIRED_SETTINGS = [
  'actions'
]

const REQUIRED_ACTIONS = [
  'selected'
]

const SelectButtons = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  REQUIRED_ACTIONS.forEach(field => {
    if(!settings.actions[field]) throw new Error(field + ' action needed')
  })

  return (state, store, routeInfo) => {

    return [{
      title:'Select All',
      handler:() => store.dispatch(actions.selected([]))
    },{
      title:'Select None',
      handler:() => store.dispatch(actions.selected([]))
    }]

  }
}

export default SelectButtons