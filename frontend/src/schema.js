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
      type:'folder'
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
      type:'item'
    }
  }
}

export const TABLE_FIELDS = [{
  title:'name',
  render:data => data.name
}]

export const LIBRARY = {}