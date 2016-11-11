/*

  the different types we have in our system
  
*/
const TYPES = {

  /*
  
    system
    
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

  project:{
    id:'project',
    leaf:'true',
    title:'Project',
    fields:[{
      name:'littleid',
      title:'id',
      type:'projectstatus'
    },{
      name:'name',
      type:'text'
    }],
    initialData:{
      
    }
  },

  client:{
    id:'client',
    leaf:'true',
    title:'Client',
    fields:[{
      name:'name',
      type:'text'
    }],
    initialData:{
      
    }
  },

  quote:{
    id:'quote',
    leaf:'true',
    title:'Quote',
    fields:[{
      name:'name',
      type:'text'
    },{
      name:'clientid',
      type:'clientid',
      title:'Client'
    }],
    initialData:{
      
    }
  },

  template:{
    id:'template',
    leaf:'true',
    title:'Template',
    fields:[{
      name:'name',
      type:'text'
    }],
    initialData:{
      _digger:{
        tag:'template'
      }
    }
  },

  team:{
    id:'team',
    leaf:'true',
    title:'Team',
    fields:[{
      name:'name',
      type:'text'
    },{
      name:'members',
      type:'diggerlist',
      section:'resources',
      tag:'team_members',
      selector:'labour',
      includeCore:true
    }],
    initialData:{
      _digger:{
        tag:'team'
      }
    }
  },

  /*
  
    resources
    
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

  labour:{
    id:'labour',
    leaf:'true',
    title:'Labour',
    fields:[{
      name:'name'
    },{
      name:'price',
      title:'Rate',
      type:'number'
    }],
    initialData:{
      _digger:{
        tag:'labour'
      }
    }
  },

  material:{
    id:'material',
    leaf:'true',
    title:'Material',
    fields:[{
      name:'name'
    },{
      name:'price',
      type:'number'
    }],
    initialData:{
      _digger:{
        tag:'material'
      }
    }
  },

  hire:{
    id:'hire',
    leaf:'true',
    title:'Hire',
    fields:[{
      name:'name'
    },{
      name:'price',
      title:'Rate',
      type:'number'
    }],
    initialData:{
      _digger:{
        tag:'hire'
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