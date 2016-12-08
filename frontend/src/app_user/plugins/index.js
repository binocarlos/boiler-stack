import Core from './core'
import Passport from '../../passport-slim-ui/plugin'

//import ClientApp from './clients'

const GetApps = (settings = {}) => {
  return [
    Core(settings.core),
    Passport(settings.passport)/*,
    ClientApp(settings.clients)*/
  ]
}

export default GetApps