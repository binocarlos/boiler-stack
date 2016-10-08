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
        appbar={
          <AppBar
            showMenuIconButton={false}
            title={this.props.title}
            zDepth={2} />
        }>

        <div style={styles.container}>
        
          {this.props.children}

        </div>
        
      </AppWrapper>
    )
  }

}

export default Wrapper