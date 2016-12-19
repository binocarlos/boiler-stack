import deepCheck from 'deep-check-error'

const REQUIRED_SETTINGS = [
  'actions.add',
  'actions.edit',
  'actions.delete'
]

const CrudButtons = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

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
        handler:() => store.dispatch(actions.delete())
      }])
    }

    return buttons
  }
}

export default CrudButtons