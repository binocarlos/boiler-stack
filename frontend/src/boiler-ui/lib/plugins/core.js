import reducer from '../reducer'

const BoilerCore = (settings = {}) => {
  const reducerName = settings.reducerName || 'boiler'
  const getReducers = () => {
    return {
      [reducerName]: reducer
    }
  }

  return {
    id:'boilercore',
    getReducers
  }
}

export default BoilerCore