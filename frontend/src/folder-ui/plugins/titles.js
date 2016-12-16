import { virtualTable } from '../reducers/selectors'

export const TableTitle = (pluralTitle = 'Items') => {
  return (state) => {

    const table = virtualTable(state)
    const selected = table.getSelectedItems()

    if(selected.length<=0){
      return pluralTitle
    }
    else if(selected.length==1){
      return selected[0].name
    }
    else {
      return selected.length + ' ' + pluralTitle.toLowerCase()
    }
  }
}

export const FormTitle = (title = 'Item') => {
  return (state, routeInfo) => {
    return routeInfo.mode == 'post' ? 
      'New ' + title :
      'Edit title'
  }
}

export const CombineButtons = (type = 'dropdown') => (factories = []) => {
  
}