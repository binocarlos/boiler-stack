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
      name:'name',
      type:'text'
    },{
      name:'email',
      type:'text'
    },{
      name:'password',
      inputtype:'password'
    },{
      name:'accesslevel',
      title:'Access Level',
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
    // an example of a custom getTitle
    getTitle:(data) => {
      return data.name
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
      const typeObj = TYPES[type]
      if(!typeObj) return item.name
      const methods = METHODS[type]

      const title = methods && methods.getTitle ?
        methods.getTitle(item) :
        item.name

      return title || type.title
    }
  }
}

export default factory