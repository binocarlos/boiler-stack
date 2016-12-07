import reducer from './reducer'

const BoilerApp = (settings = {}) => {

  const getReducers = () => {
    return {
      boiler:reducer
    }
  }

  return {
    getReducers
  }
}

export default BoilerApp