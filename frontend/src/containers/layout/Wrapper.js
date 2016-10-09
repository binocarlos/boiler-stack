import React, { Component, PropTypes } from 'react'
import AppWrapper from 'kettle-ui/lib/AppWrapper'
import AppBar from 'material-ui/AppBar'

const styles = {
  container:{
    margin:'100px'
  }
}

class Wrapper extends Component {

  render() {

    return (
      <AppWrapper
        appbar={this.props.appbar}>

        <div style={styles.container}>
        
          {this.props.content}

        </div>
        
      </AppWrapper>
    )
  }

}

export default Wrapper