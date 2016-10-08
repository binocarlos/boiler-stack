import React, { Component, PropTypes } from 'react'
import Wrapper from '../components/Wrapper'

class AppWrapper extends Component {

  render() {

    return (
      <Wrapper
        title="App">
        
        {this.props.children}
        
      </Wrapper>
    )
  }

}

export default AppWrapper