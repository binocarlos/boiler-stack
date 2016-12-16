import { routerActions } from 'react-router-redux'

const REQUIRED_SETTINGS = [
  'route',
  'actions'
]

const REQUIRED_ACTIONS = [
  'revert',
  'put',
  'post'
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
    
    const formData = state.tools.data || {}
    const formMeta = state.tools.meta || {}
    const saveDisabled = formMeta.changed && formMeta.valid ? false : true

    return [{
      title:'Cancel',
      handler:() => store.dispatch(routerActions.push(route))
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
        const action = actions[routeInfo.mode]
        if(!action) throw new Error('action for mode: ' + routeInfo.mode + ' not found')
        store.dispatch(action(routeInfo.params, formData))
      }
    }]
  }
}

export default FormButtons