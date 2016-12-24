import React, { Component, PropTypes } from 'react'
import { ToolbarWrapper } from './Wrappers'
import { 
  getRouteInfo,
  compareRouteInfo
} from '../tools'

class SectionWrapper extends Component {

  componentDidMount() {
    if(!this.props.initialize) return
    this.props.initialize(getRouteInfo(this.props))
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.initialize) return
    if(!compareRouteInfo(getRouteInfo(this.props), getRouteInfo(nextProps))) return
    this.props.initialize(getRouteInfo(nextProps))
  }

  render() {

    if(!this.props.ContentComponent) throw new Error('ContentComponent option needed')
    if(!this.props.ToolbarComponent) throw new Error('ToolbarComponent option needed')

    const ToolbarComponent = this.props.ToolbarComponent
    const ContentComponent = this.props.ContentComponent
    const StaticComponents = this.props.StaticComponents || []

    const toolbar = (
      <ToolbarComponent />
    )
    const content = (
      <ContentComponent />
    )
    const statics = StaticComponents.map((StaticComponent, i) => {
      return (
        <div key={i}>
          <StaticComponent />
        </div>
      )
    })

    return (
      <ToolbarWrapper
        toolbar={toolbar}>
        <div>
          <div>
            {content}
          </div>
          <div>
            {statics}
          </div>
        </div>
      </ToolbarWrapper>
    )
  }
}

export default SectionWrapper