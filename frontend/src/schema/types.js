/*

  the different types we have in our system
  
*/
const TYPES = {
  user:{
    id:'user',
    leaf:'true',
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
    leaf:'true',
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
  return {
    types:TYPES,
    getType:(type) => {
      return TYPES[type]
    },
    isLeaf:(type) => {
      type = TYPES[type]
      if(!type) return true
      return type.leaf ? true : false
    }
  }
}

export default factory