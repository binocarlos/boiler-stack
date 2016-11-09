/*

  the different types we have in our system
  
*/
const TYPES = {

  /*
  
    storage
    
  */
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

  /*
  
    digger
    
  */
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

/*

  so we can keep the types pure data
  we keep the functions here
  
*/
const METHODS = {
  user:{
    getTitle:(data) => {
      if(data.firstname || data.surname){
        return [
          data.firstname,
          data.surname
        ].filter(s => s).join(' ')
      }
      return null
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
    },
    getTitle:(type, item = {}) => {
      type = TYPES[type]
      if(!type) return item.name
      const methods = METHODS[type]

      return methods && methods.getTitle ?
        methods.getTitle(item) :
        item.name || type.id.replace(/^(\w)/, (s) => s.toUpperCase())
    }
  }
}

export default factory