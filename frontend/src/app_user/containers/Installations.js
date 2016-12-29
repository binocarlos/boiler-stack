import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import CrudList from '../../boiler-ui/lib/components/toolbars/CrudList'
import icons from '../config/icons'

class Installations extends Component {

  render() {

    return (
      <CrudList
        title='Companies'
        icon={icons.installation}
        onAdd={this.props.onAdd}
        redirect={this.props.redirect}
        actions={[
          ['Test1', 'inbox', '/'],
          ['Test2', 'inbox', '/']
        ]}
      >
        <div>
            table
        </div>
      </CrudList>
    )
  }

}


const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAdd: () => console.log('adding'),
    redirect: (path) => dispatch(routerActions.push(path))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Installations)