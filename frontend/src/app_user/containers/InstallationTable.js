import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { router as routerActions } from '../actions'
import TableToolbar from '../../boiler-ui/lib/components/toolbars/Table'
import icons from '../config/icons'
import { getRoute } from '../tools'

class InstallationTable extends Component {

  render() {

    return (
      <TableToolbar
        title='Companies'
        icon={icons.installation}
        onAdd={() => this.props.redirect('/companies/add')}
        redirect={this.props.redirect}
        buttonActions={[
          ['Test1', 'inbox', '/'],
          ['Test2', 'inbox', '/']
        ]}
        addIcon={icons.add}
      >
        <div>
            table
        </div>
      </TableToolbar>
    )
  }

}


const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect: (path) => dispatch(routerActions.push(getRoute(path)))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstallationTable)