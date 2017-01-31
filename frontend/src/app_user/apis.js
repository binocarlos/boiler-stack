import Ajax from '../boiler-ui/lib/api/ajax'
import Crud from '../boiler-ui/lib/api/crud'
import UserSelectors from '../boiler-ui/lib/plugins/user/selectors'

import URLS from './urls'

const userSelectors = UserSelectors(state => state.user)
const activeInstallation = (state) => userSelectors.status.currentInstallation(state)

const urlInjector = getUrl => (req, query) => {
  req.url = getUrl(req.url)
  return req
}

const installationInjector = getUrl => (req, query) => {
  req.url = getUrl(req.url)
  req.params = Object.assign({}, req.params, {
    i: activeInstallation(query.state)
  })
}

const user = {
  status: (query) => Ajax({
    method: 'get',
    url: URLS.user.status()
  }),

  login: (query) => Ajax({
    method: 'post',
    url: URLS.user.login(),
    data: query.data
  }),

  register: (query) => Ajax({
    method: 'post',
    url: URLS.user.register(),
    data: query.data
  })
}

const installation = Crud(urlInjector(URLS.installation), {
  activate: (query) => Ajax({
    method: 'put',
    url: URLS.installation('/' + query.params.id + '/activate')
  })
})

const client = Crud(installationInjector(URLS.client))
const project = Crud(installationInjector(URLS.project))

const apis = {
  user,
  installation,
  client,
  project
}

export default apis