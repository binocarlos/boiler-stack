import InstallationTable from './installation_table'

const Statics = (store) => {

  return {

    installation: {

      table: InstallationTable(store)

    }

  }
}

export default Statics