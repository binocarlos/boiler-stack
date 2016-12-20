/*

  the list injectors turns an array into an object
  and a list of ids - this does the opposite
  
*/
export const list = (data = {}, selected) => {
  return selected ?
    selected.map(id => data.db[id]) :
    data.ids.map(id => data.db[id])
}

export const selectedTitle = (selected = [], title = 'Items') => {
  if(selected.length<=0){
    return title
  }
  else if(selected.length==1){
    return selected[0].name
  }
  else {
    return selected.length + ' ' + title
  }
}