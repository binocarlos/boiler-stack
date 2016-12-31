import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { router as routerActions } from '../actions'
import CrudTableToolbar from '../../boiler-ui/lib/components/toolbars/CrudTable'
import icons from '../config/icons'
import { getRoute } from '../tools'

class Installations extends Component {

  render() {

    return (
      <CrudTableToolbar
        title='Companies'
        icon={icons.installation}
        onAdd={() => this.props.redirect('/companies/add')}
        redirect={this.props.redirect}
        actions={[
          ['Test1', 'inbox', '/'],
          ['Test2', 'inbox', '/']
        ]}
      >
        <div>
            table
        </div>
      </CrudTableToolbar>
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
)(Installations)