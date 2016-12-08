const CorePlugin = (settings = {}) => {

  const getSettings = () => {
    return {
      getTitle:(state) => settings.title || 'Boiler Stack'
    }
  }

  return {
    getSettings
  }
}

export default CorePlugin