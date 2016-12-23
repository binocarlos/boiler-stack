import React from 'react'
import Snackbar from '../containers/Snackbar'

const REQUIRED_SETTINGS = [
  'actions.open',
  'actions.close'
]

const SnackbarPlugin = (settings = {}) => {

  const reducerName = settings.reducerName || 'snackbar'

  const getReducers = () => {
    return {
      [reducerName]: ToggleReducer()
    }
  }

  const getContainers = () => {
    return (
      <Snackbar 
        reducerName={reducerName}
        onClose={actions.close}
      />
    )
  }

  return {
    id:reducerName,
    getReducers,
    getContainers
  }
}

export default SnackbarPlugin