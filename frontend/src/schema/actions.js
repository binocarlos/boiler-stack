import {
  isIdTopLevel
} from '../tools'

/*



  choose which of the types can be added to a parent

  context gets

    * parent
    * selected
    * clipboard
    * clipboardMode
    * getState
    * dispatch
  
*/
const filterActions = (opts = {}) => (context = {}, actions = []) => {


  let disableActions = {}

  // this means the current focus is a top-level database container
  if(isIdTopLevel(opts.databases, context.parent.id)){
    disableActions.edit = context.selected.length<=0
  }

  return actions
    .filter(action => disableActions[action.id] ? false : true)
    .concat(process.env.NODE_ENV ? [{
      id:'debug',
      title:'Debug',
      handler:() => {
        console.log(JSON.stringify(context, null, 4))
      }
    }] : [])
}

export default filterActions