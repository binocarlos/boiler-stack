const URL = (base) => (path = '') => base + path

const auth = URL('/api/v1')
const installation = URL('/api/v1/installations')
const client = URL('/api/v1/clients')
const project = URL('/api/v1/projects')

const URLS = {
  user: {
    status: auth('/status'),
    login: auth('/login'),
    register: auth('/register'),
    logout: auth('/logout?redirect=/app')
  },
  installation: installation(),
  client: client(),
  project: project()
}

export default URLS