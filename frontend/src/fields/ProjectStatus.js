import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import { COLORS } from '../schema/colors'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'

/*

  a chip that reads the current project and display 'active'
  if this project is the active one
  
*/

const styles = {
  chip: {
    margin: 4
  },
  container:{
    display:'inline-block'
  }
}

class ProjectStatus extends Component {

  getIDChip() {
    return (
      <Chip
        style={styles.chip}
      >
        <Avatar size={32}>
          id
        </Avatar>
        {this.props.value}
      </Chip>
    )
  }

  getActiveChip() {
    if(!this.props.isActive) return null
    return (
      <Chip
        backgroundColor={COLORS.highlight.bg}
        style={styles.chip}
      >
        Active
      </Chip>
    )
  }

  
  render() {

    return (
      <div>
        <div style={styles.container}>
          {this.getIDChip()}
        </div>
        <div style={styles.container}>
          {this.getActiveChip()}
        </div>
      </div>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
    isActive:true
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectStatus)