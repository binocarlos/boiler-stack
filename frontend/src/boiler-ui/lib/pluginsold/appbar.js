import React from 'react'
import AppBar from '../components/AppBar'

const AppBarPlugin = (settings = {}) => {
  const getContainers = () => {
    return (
      <AppBar 
        title={settings.title}
      />
    )
  }
  return {
    id:'appbar',
    getContainers
  }
}

export default AppBarPlugin