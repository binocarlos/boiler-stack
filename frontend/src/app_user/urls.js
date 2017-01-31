const URL = (base) => (path = '') => base + path

const auth = (base) => URL('/api/v1' + base)
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
  installation: installation,
  client: client,
  project: project
}

export default URLS