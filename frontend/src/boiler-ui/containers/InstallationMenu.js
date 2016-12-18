import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { routerActions } from 'react-router-redux'
import AppBarDropdown from '../components/AppBarDropdown'

import {
  getUserData
} from 'passport-slim-ui/src/selectors'

export class AccountMenuContainer extends Component {

  componentWillMount() {
    this.props.loadInitialData()
  }

  render() {
    if(this.props.items.length <= 0) return this.props.children
    const useProps = Object.assign({}, this.props, {
      changeItem:(id) => {
        if(id == this.props.currentItem) return
        if(id == 'edit'){
          const currentRoute = this.props.router.location.pathname
          if(currentRoute.replace(/\//g, '') == this.props.installationRoute.replace(/\//g, '')) return
        }
        this.props.doChangeItem(id)
      }
    })
    return (
      <AppBarDropdown {...useProps} />
    )
  }
}

function mapStateToProps(state, ownProps) {

  const user = ownProps.userSelector(state)
  const data = ownProps.dataSelector(state)
  const userData = user.data || {}

  const items = ownProps.dataSelector(state).data || []

  items.push({
    name:ownProps.editTitle || 'edit installations',
    id:'edit'
  })

  return {
    items,
    currentItem:userData.currentInstallation
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadInitialData:() => {
      dispatch(ownProps.loadInititalData())
    },
    doChangeItem:(id) => {
      if(id == 'edit'){
        dispatch(routerActions.push(ownProps.installationRoute))
      }
      else{
        dispatch(ownProps.switchInstallation(id))  
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountMenuContainer))
