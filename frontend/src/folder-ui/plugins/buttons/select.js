import deepCheck from 'deep-check-error'

const REQUIRED_SETTINGS = [
  'actions.selected'
]

const SelectButtons = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

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