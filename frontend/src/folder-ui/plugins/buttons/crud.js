const REQUIRED_SETTINGS = [
  'route',
  'actions'
]

const REQUIRED_ACTIONS = [
  'redirect'
]

const CrudButtons = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  REQUIRED_ACTIONS.forEach(field => {
    if(!settings.actions[field]) throw new Error(field + ' action needed')
  })

  const route = settings.route
  const actions = settings.actions

  return (state, store, routeInfo) => {

    const selected = state.selectedItems

    let buttons = []

    if(selected.length<=0){
      buttons = buttons.concat([{
        title:'Add',
        handler:() => store.dispatch(actions.redirect(route + '/add'))
      }])
    }
    else if(selected.length==1){
      buttons = buttons.concat([{
        title:'Edit',
        handler:() => store.dispatch(actions.redirect(route + '/edit/' + selected[0].id))
      }])
    }

    if(selected.length>0){
      buttons = buttons.concat([{
        title:'Delete',
        handler:() => store.dispatch(actions.redirect(route + '/edit/' + selected[0].id))
      }])
    }
  }
}

export default CrudButtons