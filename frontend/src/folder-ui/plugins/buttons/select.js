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

  const actions = settings.actions

  return (state, store, routeInfo) => {
    return [{
      title:'Select All',
      handler:() => store.dispatch(actions.selected(state.data.map(item => item.id)))
    },{
      title:'Select None',
      handler:() => store.dispatch(actions.selected([]))
    }]

  }
}

export default SelectButtons