import React from 'react'
import { AppBar } from 'react-toolbox/lib/app_bar'

const MainAppBar = (props) => {
  return (
    <AppBar 
      title={this.props.title} 
      leftIcon='menu'
      flat 
      fixed
    >
      {this.props.children}
    </AppBar>
  )
}

MainAppBar.propTypes = {
  title: React.PropTypes.string,
  className: React.PropTypes.string
}

MainAppBar.defaultProps = {
  title: '',
  className: ''
}

export default MainAppBar