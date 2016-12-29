const BASE = (base) => (path = '') => base + path

const auth = BASE('/auth/v1')
const currentuser = BASE('/api/v1/currentuser')
const installation = BASE('/api/v1/installation')

const URLS = {
  user: {
    status: auth('/status'),
    login: auth('/login'),
    logout: auth('/logout?redirect=/app'),
    register: auth('/register'),
    update: currentuser()
  },
  installation: installation()
}

export default URLS