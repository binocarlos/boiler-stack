import MongoCrud from './mongocrud'

import ICON from 'material-ui/svg-icons/file/cloud'

const DEFAULT_SETTINGS = {
  type:'installation',
  title:'Installation',
  api_url:'/api/v1/installations',
  route:'installations',
  reducer:'installations',
  action_prefix:'INSTALLATIONS',
  icon:ICON
}

const InstallationsPlugin = (settings = {}) => {
  settings = Object.assign({}, DEFAULT_SETTINGS, settings)
  return MongoCrud(settings)
}

export default InstallationsPlugin