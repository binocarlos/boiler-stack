import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import Divider from 'material-ui/Divider'
import styles from '../styles'

class RegisterMessage extends Component {
  
  render() {
    return (
      <div style={styles.registerBottom}>
        <Divider />
        <div style={styles.marginTop}>
          Enter your details to register.
        </div>
      </div>
    )
  }
}

export default RegisterMessage