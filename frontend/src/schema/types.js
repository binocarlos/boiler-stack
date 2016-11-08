/*

  the different types we have in our system
  
*/
const TYPES = {
  user:{
    id:'user',
    title:'User',
    fields:[{
      name:'firstname',
      type:'text'
    },
    {
      name:'lastname',
      type:'text'
    }],
    initialData:{
      
    }
  },
  folder:{
    id:'folder',
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
    id:'item',
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

const factory = (opts = {}) => {
  return TYPES
}

export default factory