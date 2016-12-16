import { routerActions } from 'react-router-redux'
import { virtualTable } from '../../reducers/selectors'

const REQUIRED_SETTINGS = [
  'route'
]

const CrudButtons = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  const route = settings.route

  return (state, store, routeInfo, actions) => {

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

    if(selected.length>0){
      buttons = buttons.concat([{
        title:'Delete',
        handler:() => store.dispatch(routerActions.push(route + '/edit/' + selected[0].id))
      }])
    }

    return buttons
  }
}

export default CrudButtons