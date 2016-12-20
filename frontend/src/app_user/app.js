import actions from './actions'
import reducers from './reducers'
import sagas from './sagas'
import getRoutes from './routes'
import plugins from './plugins'

// map the master reducer object into an array of plugins
// so the boiler-frontend factory merges the top-level keys
// into the other reducers
const corePlugins = Object.keys(reducers || {}).map((id) => {
  return {
    id,
    getReducer:() => reducers[id]
  }
}).concat([{
  getSagas:() => sagas,
  getRoutes
}])

const appPlugins = []
  .concat(corePlugins)
  .concat(plugins)

export default appPlugins