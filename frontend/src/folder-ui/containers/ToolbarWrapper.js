import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { getRouteInfo } from '../tools'

import { ToolbarWrapper } from '../components/Wrappers'
import Toolbar from '../components/Toolbar'

export class ToolbarWrapper extends Component {

  componentDidMount() {
    this.props._runInitializeData()
  }
  
  componentWillReceiveProps(nextProps) {
    
  }

  render() {

    if(!this.props.ContentComponent) throw new Error('ContentComponent option needed')

    const routeInfo = getRouteInfo(this.props)
    const ContentComponent = this.props.ContentComponent
    const ToolbarComponent = this.props.ToolbarComponent || Toolbar

    const toolbarProps = this.props.getToolbarProps ?
      this.props.getToolbarProps(routeInfo) :
      {}

    const contentProps = this.props.getContentProps ?
      this.props.getContentProps(routeInfo) :
      {}

    const statics = this.props.getStatics ?
      this.props.getStatics(routeInfo)

    const finalToolbarProps = Object.assign({}, this.props, toolbarProps)
    const finalContentProps = Object.assign({}, this.props, contentProps)

    return (
      <ToolbarWrapper
        toolbar={<ToolbarComponent {...finalToolbarProps} />}>
        <div>
          <ContentComponent {...finalContentProps} />
          <div>
            {statics}
          </div>
        </div>
      </ToolbarWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return ownProps.getState ?
    ownProps.getState(getRouteInfo(ownProps)) :
    {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  if(!ownProps.initializeData) throw new Error('no initializeData prop given to ToolbarWrapper container')
  return {
    _runInitializeData:() => {
      ownProps.initializeData(getRouteInfo(ownProps))
    }
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionContainer)
