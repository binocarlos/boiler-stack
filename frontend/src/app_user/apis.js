import Ajax from '../boiler-ui/lib/api/ajax'
import UserSelectors from '../boiler-ui/lib/plugins/user/selectors'

import URLS from './urls'

const userSelectors = UserSelectors(state => state.user)

/*
      const currentInstallation = yield select(userSelectors.status.currentInstallation)
      // inject the currentInstallation into all api queries
      const query = Object.assign({}, action.query, {
        currentInstallation
      })


      status: () => URLS.user.status,
  login: () => URLS.user.login,
  register: () => URLS.user.register,
  update: () => URLS.user.update

  const ajaxClient = Ajax({
  name: 'ajax client'
})
*/

// append the current installation id
const activeInstallation = (state) => userSelectors.status.currentInstallation(state)

const Crud = (getUrl) => {
  return {

    list: (state) => (query, payload) => Ajax({
      method: 'get',
      url: getUrl(state)
    }),

    post: (state) => (query, payload) => Ajax({
      method: 'post',
      url: URLS.installation,
      data: payload
    }),

    get: (state) => (query, payload) => Ajax({
      method: 'get',
      url: URLS.installation + '/' + query.id
    }),

    put: (state) => (query, payload) => Ajax({
      method: 'put',
      url: URLS.installation + '/' + query.id,
      data: payload
    }),

    delete: (state) => (query, payload) => Ajax({
      method: 'delete',
      url: URLS.installation + '/' + query.id
    })
  }

}

const user = {
  status: (state) => (query, payload) => Ajax({
    method: 'get',
    url: URLS.user.status
  }),

  login: (state) => (query, payload) => Ajax({
    method: 'post',
    url: URLS.user.login,
    data: payload
  }),

  register: (state) => (query, payload) => Ajax({
    method: 'post',
    url: URLS.user.register,
    data: payload
  })
}

const installation = Crud((state) => {

})
\{

  list: (state) => (query, payload) => Ajax({
    method: 'get',
    url: URLS.installation
  }),

  post: (state) => (query, payload) => Ajax({
    method: 'post',
    url: URLS.installation,
    data: payload
  }),

  get: (state) => (query, payload) => Ajax({
    method: 'get',
    url: URLS.installation + '/' + query.id
  }),

  put: (state) => (query, payload) => Ajax({
    method: 'put',
    url: URLS.installation + '/' + query.id,
    data: payload
  }),

  delete: (state) => (query, payload) => Ajax({
    method: 'delete',
    url: URLS.installation + '/' + query.id
  })
}

/*
export const client = CrudAjax({
  name: 'client',
  getUrl: (query) => [URLS.client, query.currentInstallation].join('/')
})

export const project = CrudAjax({
  name: 'project',
  getUrl: (query) => [URLS.project, query.currentInstallation].join('/')
})
*/


const apis = {
  user,
  installation,
  client,
  project
}

export default apis