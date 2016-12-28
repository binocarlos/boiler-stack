import { URLS } from '../apis'
import icons from './icons'

export const guest = [
  ['Home', icons.home, '/'],
  ['Help', icons.help, '/help'],
  ['About', icons.about, '/about'],
  '-',
  ['Login', icons.login, '/login'],
  ['Register', icons.register, '/register']
]

export const user = [
  ['Dashboard', icons.dashboard, '/'],
  ['Help', icons.help, '/help'],
  ['About', icons.about, '/about'],
  '-',
  ['Logout', icons.logout, () => {
    document.location = URLS.user.logout
  }]
]