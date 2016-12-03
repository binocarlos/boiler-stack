import update from 'react/lib/update'

const DEFAULT_STATE = {
  user:{
    loading:false,
    loaded:false,
    loggedIn:false,
    data:null
  },
  login:{
    data:{},
    meta:{},
    loading:false,
    error:null
  },
  register:{
    data:{},
    meta:{},
    loading:false,
    error:null
  }
}

export default function passportReducer(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {

    case 'PASSPORT_FORM_UPDATE':

      return update(state, {
        [action.form]:{
          data:{
            $set:action.data
          },
          meta:{
            $set:action.meta
          }
        }
      })
      
    default:
      return state
  }
}