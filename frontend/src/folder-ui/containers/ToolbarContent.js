import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ToolbarWrapper } from '../components/Wrappers'

import Toolbar from '../components/Toolbar'

const getRouteInfo = (props) => {
  return {
    path:props.route.path,
    params:props.routeParams
  }
}

export class CollectionContainer extends Component {

  componentDidMount() {
    this.props.initialize()
  }
  
  componentWillReceiveProps(nextProps) {
    
  }

  render() {

    if(!this.props.ContentComponent) throw new Error('ContentComponent option needed')

    const ContentComponent = this.props.ContentComponent
    const ToolbarComponent = this.props.ToolbarComponent || Toolbar

    // injected props passed in things like function handlers
    // we pass them here because it won't trigger a redux connect re-render
    const injectedProps = this.props.getInjectedProps ?
      this.props.getInjectedProps(getRouteInfo(this.props)) :
      {}

    const toolbarProps = Object.assign({}, this.props.toolbar, injectedProps.toolbar)
    const contentProps = Object.assign({}, this.props.content, injectedProps.content)

    return (
      <ToolbarWrapper
        toolbar={<ToolbarComponent {...toolbarProps} />}>
        <ContentComponent {...contentProps} />
      </ToolbarWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // get props returns the selected state
  // if this changes we will get a re-render
  return ownProps.getProps ?
    ownProps.getProps(getRouteInfo(ownProps)) :
    {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  if(!ownProps.initialize) throw new Error('no initialize prop given to Collection container')
  return {
    initialize:() => {
      ownProps.initialize(getRouteInfo(ownProps))
    }
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionContainer)
