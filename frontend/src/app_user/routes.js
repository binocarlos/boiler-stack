const dashboard = {
  page:'dashboard'
}

const ROUTES = {
  '': dashboard,
  '/': dashboard,
  '/help': {
    page:'help'
  },
  '/about': {
    page:'about'
  }
}

const getRoutes = ({ basepath }) => {
  // prepend the basepath to each route
  return Object.keys(ROUTES).reduce((all, route) => {
    return Object.assign({}, all, {
      [basepath + route]: ROUTES[route]
    })
  }, {})
}

export default getRoutes