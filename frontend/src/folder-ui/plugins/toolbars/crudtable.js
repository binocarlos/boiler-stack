import { routerActions } from 'react-router-redux'
import { virtualTable } from '../../reducers/selectors'

const REQUIRED_SETTINGS = [
  'title',
  'pluralTitle',
  'route'
]

const CrudTableToolbar = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  const route = settings.route
  const title = settings.title
  const pluralTitle = settings.pluralTitle

  const getTitle = (state, routeInfo) => {
    return pluralTitle
  }

  const getButtons = (state, store, routeInfo, actions) => {

    const table = virtualTable(state)
    const selected = table.getSelectedItems()

    let buttons = []

    if(selected.length<=0){
      buttons = buttons.concat([{
        title:'Add',
        handler:() => store.dispatch(routerActions.push(route + '/add'))
      }])
    }
    else if(selected.length==1){
      buttons = buttons.concat([{
        title:'Edit',
        handler:() => store.dispatch(routerActions.push(route + '/edit/' + selected[0].id))
      }])
    }

    return buttons
  }

  return {
    getTitle,
    getButtons
  }
}

export default CrudTableToolbar