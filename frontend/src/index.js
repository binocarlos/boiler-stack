import boilerapp from 'boiler-frontend'
import folderreducer from 'folder-ui/lib/reducer'

import About from './containers/About'
import Folders from './containers/Folders'

boilerapp({
  mountElement:document.getElementById('mount'),
  reducers:{
    folderui:folderreducer
  },
  routes:[{
    path:'/about',
    component:About,
    openAccess:true
  },{
    path:'/folders',
    component:Folders
  }, {
    path:'/folders/*',
    components:Folders
  }]
})