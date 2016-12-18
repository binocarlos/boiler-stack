import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AppBarDropdown from '../components/AppBarDropdown'

import {
  getUserData
} from 'passport-slim-ui/src/selectors'

export class AccountMenuContainer extends Component {
  render() {
    if(this.props.items.length <= 0) return this.props.children
    return (
      <AppBarDropdown {...this.props} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  const userData = getUserData(state)
  const accounts = []//getAccounts(state)

  return {
    items:[],
    currentItem:null
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    changeItem:(id) => {
      console.log('-------------------------------------------');
      console.log('change installation: ' + id)
      //dispatch(requestUpdateUserProject(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountMenuContainer)
