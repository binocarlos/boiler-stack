import { routerActions } from 'react-router-redux'

const REQUIRED_SETTINGS = [
  'title',
  'pluralTitle',
  'route'
]

const FormToolbar = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  const route = settings.route
  const title = settings.title
  const pluralTitle = settings.pluralTitle

  const getTitle = (state, routeInfo) => {
    return routeInfo.mode == 'add' ? 
      'New ' + title :
      'Edit title'
  }

  const getButtons = (state, store, routeInfo, actions) => {
    
    const formData = state.tools.data || {}
    const formMeta = state.tools.meta || {}
    const saveDisabled = formMeta.changed && formMeta.valid ? false : true

    return [{
      title:'Cancel',
      handler:() => store.dispatch(routerActions.push(route))
    },{
      title:'Revert',
      handler:() => store.dispatch(actions.tools.revert())
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
        store.dispatch(action.request(routeInfo.params, formData))
      }
    }]
  }

  return {
    getTitle,
    getButtons
  }
}

export default FormToolbar