import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { RelativeFragment as Fragment } from 'redux-little-router'

import Dashboard from '../components/Dashboard'
import Help from '../components/Help'
import About from '../components/About'

class Screens extends Component {

  getRoute(path) {
    return this.props.basepath + path
  }

  relativePath(path) {
    return path.substr(this.props.basepath.length)
  }

  isDashboard() {
    const pathname = this.props.router.pathname
    const isDashboard = this.relativePath(pathname) == '' || this.relativePath(pathname) == '/'
  }

  render() {
    const pathname = this.props.router.pathname
    const isDashboard = this.relativePath(pathname) == '' || this.relativePath(pathname) == '/'

    if(isDashboard) {
      return (
        <div>
          <Dashboard />
        </div>
      )
    }
    
    return (
      <div>
        <Fragment forRoute={this.getRoute('/help')}>
          <Help />
        </Fragment>
        <Fragment forRoute={this.getRoute('/about')}>
          <About />
        </Fragment>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    router: state.router
  }
}

const mapDispatchToProps = (state, ownProps) => {
  return {}
}

Screens.propTypes = {
  basepath: PropTypes.string.isRequired
}

Screens.defaultProps = {
  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Screens)