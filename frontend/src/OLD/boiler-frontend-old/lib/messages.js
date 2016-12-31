const boot = (settings) => {
  if(process.env.NODE_ENV != 'production'){
    console.log('-------------------------------------------')
    console.log('-------------------------------------------')
    console.log('DEVELOPMENT MODE')
    console.log('to activate logging - enter the following into the console and reload:')
    console.log('')
    console.log(' > localStorage.debug = true')
    console.log('')
    console.log('to disable logs:')
    console.log('')
    console.log(' > delete localStorage.debug')
    console.log('-------------------------------------------')
    console.log('-------------------------------------------')
    console.log('settings:')
    console.dir(settings)
  }
}

const messages = {
  boot
}

export default messages