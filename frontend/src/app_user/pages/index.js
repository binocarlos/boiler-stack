import InstallationTable from './installation_table'
import InstallationForm from './installation_form'

const Pages = (store) => {

  return {

    installation: {

      table: InstallationTable(store),
      form: InstallationForm(store)

    }

  }
}

export default Pages