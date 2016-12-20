import reducer from '../reducer'

const BoilerCore = (settings = {}) => {

  const getReducer = () => {
    return reducer
  }

  return {
    id:'boiler',
    getReducer
  }
}

export default BoilerCore