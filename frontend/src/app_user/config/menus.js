import { routerActions } from 'react-router-redux'

import { logout } from 'passport-slim-ui/src/actions'

const sections = (store) => {
  return [{
    label:'Companies',
    path:'/companies'
  }]
}

const user = (store, appbar = false) => {
  let menu = [{
    label:'Home',
    path:'/'
  }]

  if(!appbar){
    menu = menu.concat(sections(store))
  }

  menu = menu.concat([{
    label:'Help',
    path:'help'
  },{
    label:'About',
    path:'about'
  },{
    label:'Logout',
    handler:() => store.dispatch(logout())
  }])

  return menu
}

const guest = (store) => {
  return [{
    label:'Login',
    path:'login'
  },{
    label:'Register',
    path:'register'
  },{
    label:'Help',
    path:'help'
  },{
    label:'About',
    path:'about'
  }]
}

const menus = {
  user,
  guest
}

export default menus