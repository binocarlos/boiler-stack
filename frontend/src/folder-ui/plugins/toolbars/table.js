import { routerActions } from 'react-router-redux'

const REQUIRED_SETTINGS = [
  'route'
]

const TableToolbar = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  const route = settings.route

  const getButtons = (state, store, routeInfo, actions) => {
    const selected = state.tools.selected || []

    return [{
      title:'Add',
      handler:() => store.dispatch(routerActions.push(route + '/add'))
    }]
  }

  return getButtons
}

export default TableToolbar