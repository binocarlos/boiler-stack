import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'


import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import {
  getCurrentProject,
  nameSort
} from '../tools'

/*

  a select list that speaks to /api/v1/clients/:projectid
  to list the clients in the current project
  
*/
class ClientId extends Component {

  handleChange = (event, index, value) => this.props.update(value)

  componentDidMount() {
    this.props.requestClientData()
  }

  render() {

    let clientList = [].concat(this.props.clients || [])
    clientList.sort(nameSort)

    return (
      <SelectField
        floatingLabelText={this.props.title}
        value={this.props.value}
        onChange={this.handleChange}
      >
      {
        clientList.map((client, i) => {
          return (
            <MenuItem 
              key={i}
              value={client._id} 
              primaryText={client.name} />
          )
        })
      }
      </SelectField>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    clients:state.clients.children.data || []
  }
}

function mapDispatchToProps(dispatch, ownProps) {

  const context = ownProps.getContext() || {}
  
  return {
    requestClientData:() => {
      if(context.loadClients) dispatch(context.loadClients())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientId)