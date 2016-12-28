const URLS = {
  user: {
    status: '/auth/v1/status',
    login: '/auth/v1/login',
    logout: '/auth/v1/logout?redirect=/app',
    register: '/auth/v1/register',
    update: '/api/v1/currentuser'
  },
  installation: {
    table: '/api/v1/installation'
  }
}

export default URLS