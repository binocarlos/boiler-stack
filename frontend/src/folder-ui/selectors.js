export const list = (data = {}) => {
  return data.ids.map(id => data.db[id])
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