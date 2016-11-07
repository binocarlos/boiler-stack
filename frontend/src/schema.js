export const USER_DETAILS = [{
  name:'firstname',
  type:'text'
},
{
  name:'lastname',
  type:'text'
}]

export const TYPES = {
  folder:{
    title:'Folder',
    fields:[{
      name:'name'
    }],
    initialData:{
      _digger:{
        tag:'folder'
      }
    }
  },
  item:{
    title:'Item',
    fields:[{
      name:'name'
    },{
      name:'comment'
    }],
    initialData:{
      _digger:{
        tag:'item'
      }
    }
  }
}

export const TABLE_FIELDS = [{
  title:'name',
  render:data => data.name
}]

/*

  custom library items
  
*/
export const LIBRARY = {}

/*

  sort by digger tag then name
  
*/
const getItemType = (item = {}) => {
  const digger = item._digger || {}
  return (digger.tag || '').toLowerCase()
}

const getItemName = (item = {}) => {
  return (item.name || '').toLowerCase()
}

export const ITEMSORT = (a, b) => {
  if (getItemType(a) < getItemType(b)) return -1;
  if (getItemType(a) > getItemType(b)) return 1;
  if (getItemName(a) < getItemName(b)) return -1;
  if (getItemName(a) > getItemName(b)) return 1;
  return 0;
}