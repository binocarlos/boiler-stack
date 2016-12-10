import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AccountMenu from '../components/AccountMenu'

import {
  getUserData
} from 'passport-slim-ui/src/selectors'

import {
  getAccounts
} from '../selectors'

export class AccountMenuContainer extends Component {
  render() {
    if(this.props.accounts.length <= 0) return this.props.children
    return (
      <AccountMenu {...this.props} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  const userData = getUserData(state)
  const accounts = getAccounts(state)

  return {
    accounts:[],
    currentAccount:null
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    changeAccount:(id) => {
      console.log('-------------------------------------------');
      console.log('change project: ' + id)
      //dispatch(requestUpdateUserProject(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountMenuContainer)
