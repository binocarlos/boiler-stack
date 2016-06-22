import { json } from './ajax'

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  data: null,
  statusCode:null,
  headers:{}
}

/*

  an REST api reducer that understands
   * request
   * response
   * error
  actions

  the actions is an array e.g:

[
  REGISTER_REQUEST,
  REGISTER_RECEIVE,
  REGISTER_ERROR
]
  
  the maps object allows for custom logic for each stage:

{
  error:function(state, action){
    if(action.data.error){
      state.error = action.data.error
    }
    return state
  }
}

  the filter function is called before anything else
  if the filter function returns something - we skip
  the other steps and return that  
*/
export default function apiReducer(actions = [], maps = {}, filter){
  return function update(state = initialState, action) {
    if(filter){
      var ret = filter(state, action)
      if(ret) return ret
    }
    switch (action.type) {
      case actions[0]:
        var ret = Object.assign({}, state, {
          loading: true
        })
        if(maps.request){
          return maps.request(ret, action)
        }
        else{
          return ret
        }
      case actions[1]:
        var ret = Object.assign({}, state, {
          loading: false,
          loaded: true,
          error: null,
          data: action.data,
          statusCode: action.statusCode,
          headers: action.headers
        })
        if(maps.receive){
          return maps.receive(ret, action)
        }
        else{
          return ret
        }
      case actions[2]:
        var ret = Object.assign({}, state, {
          loading: false,
          loaded: true,
          error: action.error,
          data: action.data,
          statusCode: action.statusCode,
          headers: action.headers
        })
        if(maps.error){
          return maps.error(ret, action)
        }
        else{
          return ret
        }
      default:
        return state
    }
  }
}