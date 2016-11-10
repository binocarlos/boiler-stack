import React, { PropTypes, Component } from 'react'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'

const styles = {
  chip: {
    margin: 4
  }
}


class ChipComponent extends Component {
  render() {
    if(!this.props.value) return ''
    return (
      <Chip
        style={styles.chip}>
        <Avatar size={32}>ID</Avatar>
        {this.props.value} 

      </Chip>
    )
  }

}

export default ChipComponent