export default (store, settings = {}) => {

  const ensureUser = (redirectUrl) => (nextState, replace, callback) => {
    console.log('-------------------------------------------');
    console.log('doing checking user: ' + redirectUrl)
    callback()
  }

  return {
    ensureUser
  }
}