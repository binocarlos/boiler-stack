export const guestMenu = () => {
  return [{
    title: 'Home',
    href: '/'
  }, {
    title: 'Login',
    href: '/login'
  }, {
    title: 'Register',
    href: '/register'
  }]
}

export const userMenu = (user) => {
  return [{
    title: 'Dashboard',
    href: '/'
  }, {
    title: 'Help',
    href: '/help'
  }, {
    title: 'About',
    href: '/about'
  }]
}