import reducer from '../reducer'

const BoilerCore = (settings = {}) => {

  const getReducers = () => {
    return {
      boiler:reducer
    }
  }

  return {
    getReducers
  }
}

export default BoilerCore