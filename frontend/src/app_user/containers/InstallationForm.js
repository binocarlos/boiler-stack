import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { router as routerActions } from '../actions'
import FormToolbar from '../../boiler-ui/lib/components/toolbars/Form'
import icons from '../config/icons'
import { getRoute } from '../tools'

import {
  installation as actions
} from '../actions'

class Installations extends Component {

  render() {

    return (
      <FormToolbar
        title='Company'
        icon={icons.installation}
        onCancel={() => this.props.redirect('/companies')}
        onRevert={this.props.revert}
        onSave={this.props.save}
        valid={true}
      >
        <div>
            form
        </div>
      </FormToolbar>
    )
  }

}


const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect: (path) => dispatch(routerActions.push(getRoute(path))),
    revert: () => console.log('revert'),
    save: () => console.log('save')
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Installations)