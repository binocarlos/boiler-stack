import React, { PropTypes, Component } from 'react'

class Page extends Component {

  render() {
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
        {this.props.children}
      </div>
    )
  }
}

Page.propTypes = {
  padding: PropTypes.number
}

Page.defaultProps = {
  padding: 1.8
}

export default Page