import URLS from './urls'
import icons from './icons'
import { getRoute } from './core'

export const guest = [
  ['Home', icons.home, getRoute('/')],
  ['Help', icons.help, getRoute('/help')],
  ['About', icons.about, getRoute('/about')],
  '-',
  ['Login', icons.login, getRoute('/login')],
  ['Register', icons.register, getRoute('/register')]
]

export const user = [
  ['Dashboard', icons.dashboard, getRoute('/')],
  ['Companies', icons.installation, getRoute('/companies')],
  '-',
  ['Table', icons.experiment, getRoute('/table')],
  ['Card', icons.experiment, getRoute('/card')],
  '-',
  ['Help', icons.help, getRoute('/help')],
  ['About', icons.about, getRoute('/about')],
  '-',
  ['Logout', icons.logout, () => {
    document.location = URLS.user.logout
  }]
]