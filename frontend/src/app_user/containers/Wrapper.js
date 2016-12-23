import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { AppBar } from 'react-toolbox/lib/app_bar'

class Wrapper extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (state, ownProps) => {
  return {}
}

Wrapper.propTypes = {
  
}

Wrapper.defaultProps = {
  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapper)

/*

  <AppBar
          title="My Apples"
          leftIcon="menu"
        />
  
*/