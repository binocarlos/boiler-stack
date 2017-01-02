const TABLES = {

  installation: {
    schema: {
      name: {type: String},
      active: {type: Boolean}
    },
    map: (currentInstallation) => (item) => {
      return {
        id: item.id,
        name: item.name,
        active: item.id == currentInstallation
      }
    }
  }
}

export default TABLES