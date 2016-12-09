import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ToolbarWrapper } from '../components/Wrappers'

import Toolbar from '../components/Toolbar'

export class CollectionContainer extends Component {

  getRouteInfo() {
    return {
      path:this.props.route.path,
      params:this.props.routeParams
    }
  }

  componentDidMount() {
    this.props.initialize(this.getRouteInfo())
  }
  
  componentWillReceiveProps(nextProps) {
    
  }

  render() {

    if(!this.props.ContentComponent) throw new Error('ContentComponent option needed')

    const ContentComponent = this.props.ContentComponent
    const ToolbarComponent = this.props.ToolbarComponent || Toolbar

    const baseProps = this.props.getProps ?
      this.props.getProps(this.getRouteInfo()) :
      {}

    return (
      <ToolbarWrapper
        toolbar={<ToolbarComponent {...baseProps.toolbar} />}>
        <ContentComponent {...baseProps.content} />
      </ToolbarWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  if(!ownProps.initialize) throw new Error('no initialize prop given to Collection container')
  return {
    initialize:(routeInfo) => {
      ownProps.initialize(routeInfo)
    }
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionContainer)
