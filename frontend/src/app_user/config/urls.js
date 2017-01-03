const BASE = (base) => (path = '') => base + path

const auth = BASE('/auth/v1')
const currentuser = BASE('/api/v1/currentuser')
const installation = BASE('/api/v1/installations')
const client = BASE('/api/v1/clients')
const project = BASE('/api/v1/projects')

const URLS = {
  user: {
    status: auth('/status'),
    login: auth('/login'),
    logout: auth('/logout?redirect=/app'),
    register: auth('/register'),
    update: currentuser()
  },
  installation: installation(),
  client: client(),
  project: project()
}

export default URLS