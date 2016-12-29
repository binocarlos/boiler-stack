import React, { Component, PropTypes } from 'react'
import Layout from '../../boiler-ui/lib/components/Layout'

class Installations extends Component {

  render() {

    const sideDrawerContent = (
      <div>
        This is the sidebar
      </div>
    )

    const panelBarContent = (
      <div>
        This is the panelbar
      </div>
    )

    return (
      <Layout
        sideDrawerContent={sideDrawerContent}
        panelBarContent={panelBarContent}
      >
  
        <div>
            <h1>Main Content</h1>
            <p>Main content goes here.</p>
            
          <br /><br /><br /><br /><br /><br />

          Navigation, account switcher, etc. go here.
          <br /><br /><br /><br /><br /><br />

          Navigation, account switcher, etc. go here.
          <br /><br /><br /><br /><br /><br />

          Navigation, account switcher, etc. go here.
          <br /><br /><br /><br /><br /><br />

          Navigation, account switcher, etc. go here.
          <br /><br /><br /><br /><br /><br />

          Navigation, account switcher, etc. go here.
          <br /><br /><br /><br /><br /><br />

          Navigation, account switcher, etc. go here.
          <br /><br /><br /><br /><br /><br />

          Navigation, account switcher, etc. go here.
          <br /><br /><br /><br /><br /><br />

          Navigation, account switcher, etc. go here.
          <br /><br /><br /><br /><br /><br />

          Navigation, account switcher, etc. go here.
          <br /><br /><br /><br /><br /><br />

          Navigation, account switcher, etc. go here.
          <br /><br /><br /><br /><br /><br />

          Navigation, account switcher, etc. go here.<br /><br /><br /><br /><br /><br />

          Navigation, account switcher, etc. go here.
          <br /><br /><br /><br /><br /><br />

          Navigation, account switcher, etc. go here.
          <br /><br /><br /><br /><br /><br />

          Navigation, account switcher, etc. go here.
        </div>
              
      </Layout>
    )
  }

}

export default Installations