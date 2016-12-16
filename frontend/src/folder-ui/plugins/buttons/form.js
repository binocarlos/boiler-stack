const REQUIRED_SETTINGS = [
  'route',
  'actions'
]

const REQUIRED_ACTIONS = [
  'revert',
  'put',
  'post',
  'redirect'
]

const FormButtons = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  REQUIRED_ACTIONS.forEach(field => {
    if(!settings.actions[field]) throw new Error(field + ' action needed')
  })

  const route = settings.route
  const actions = settings.actions
  
  return (state, store, routeInfo) => {
    
    const formData = state.data || {}
    const formMeta = state.meta || {}
    const saveDisabled = formMeta.changed && formMeta.valid ? false : true

    return [{
      title:'Cancel',
      handler:() => store.dispatch(actions.redirect(route))
    },{
      title:'Revert',
      handler:() => store.dispatch(actions.revert())
    },{
      title:'Save',
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
    }]
  }
}

export default FormButtons