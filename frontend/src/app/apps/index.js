import PassportApp from '../../passport-slim-ui/boilerapp'
import CoreApp from './core'
//import ClientApp from './clients'

const GetApps = (settings = {}) => {
  return [
    CoreApp(settings.core),
    PassportApp(settings.passport)/*,
    ClientApp(settings.clients)*/
  ]
}

export default GetApps