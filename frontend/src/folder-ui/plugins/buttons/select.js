
const REQUIRED_SETTINGS = [
  
]

const SelectButtons = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  return (state, store, routeInfo, actions) => {

    return [{
      title:'Select All',
      handler:() => store.dispatch(actions.tools.selected())
    },{
      title:'Select None',
      handler:() => store.dispatch(actions.tools.selected([]))
    }]

  }
}

export default SelectButtons