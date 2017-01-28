import Ajax from '../boiler-ui/lib/api/ajax'
import UserSelectors from '../boiler-ui/lib/plugins/user/selectors'

import URLS from './urls'

const userSelectors = UserSelectors(state => state.user)
const activeInstallation = (state) => userSelectors.status.currentInstallation(state)

// a chance to modify the query before we send it
// this is where the JWT auth header can go
// and where the = iid (installation id) parameter is set
const runQuery = (state, query) => {
  return Ajax(query)
}

const Crud = (getUrl) => {
  return {
    list: (state) => (query, payload) => runQuery(state, {
      method: 'get',
      url: getUrl(state)
    }),

    post: (state) => (query, payload) => runQuery(state, {
      method: 'post',
      url: getUrl(state),
      data: payload
    }),

    get: (state) => (query, payload) => runQuery(state, {
      method: 'get',
      url: getUrl(state) + '/' + query.id
    }),

    put: (state) => (query, payload) => runQuery(state, {
      method: 'put',
      url: getUrl(state) + '/' + query.id,
      data: payload
    }),

    delete: (state) => (query, payload) => {
      if(query.id) {
        return runQuery(state, {
          method: 'delete',
          url: getUrl(state) + '/' + query.id
        })
      }
      else if (query.ids) {
        return query.ids.map(id => {
          return runQuery(state, {
            method: 'delete',
            url: getUrl(state) + '/' + id
          })
        })
      }
    }
  }
}

const user = {
  status: (state) => (query, payload) => runQuery(state, {
    method: 'get',
    url: URLS.user.status
  }),

  login: (state) => (query, payload) => runQuery(state, {
    method: 'post',
    url: URLS.user.login,
    data: payload
  }),

  register: (state) => (query, payload) => runQuery(state, {
    method: 'post',
    url: URLS.user.register,
    data: payload
  })
}

const installation = Crud(state => URLS.installation)
const client = Crud(state => URLS.client)
const project = Crud(state => URLS.project)


const apis = {
  user,
  installation,
  client,
  project
}

export default apis