import deepCheck from 'deep-check-error'

const REQUIRED_SETTINGS = [
  'route',
  'actions.put',
  'actions.post',
  'actions.redirect'
]

const FormButtons = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const route = settings.route
  const actions = settings.actions
  
  return (state, store, routeInfo) => {
    
    const formData = state.data || {}
    const formMeta = state.meta || {}
    const saveDisabled = formMeta.changed && formMeta.valid ? false : true

    let buttons = []

    if(!settings.noCancel){
      buttons.push({
        title:settings.cancelTitle || 'Cancel',
        handler:() => store.dispatch(actions.redirect(route))
      })
    }

    if(!settings.noRevert){
      buttons.push({
        title:settings.revertTitle || 'Revert',
        handler:() => store.dispatch(actions.revert())
      })
    }

    buttons.push({
      title:settings.saveTitle || 'Save',
      extraProps:{
        primary:true,
        disabled:saveDisabled
      },
      handler:() => {
        if(!formMeta.valid) throw new Error('form is not valid - display errors')
        if(routeInfo.mode == 'put'){
          store.dispatch(actions.put(routeInfo.params, formData))
        }
        else if (routeInfo.mode == 'post'){
          store.dispatch(actions.post(routeInfo.params, formData))
        }
        else{
          throw new Error('action for mode: ' + routeInfo.mode + ' not found')
        }
      }
    })

    return buttons
  }
}

export default FormButtons