import React, { Component, PropTypes } from 'react'
import { Layout, NavDrawer, Panel } from 'react-toolbox/lib/layout'
import Page from '../../boiler-ui/lib/components/Page'
import Link from './Link'

class Installations extends Component {

  render() {

    return (
      <Layout>
          <NavDrawer active={true}
              pinned={true} permanentAt='xxxl'>
              <p>
                  Navigation, account switcher, etc. go here.
              </p>
          </NavDrawer>
          <Panel>
              <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                  <h1>Main Content</h1>
                  <p>Main content goes here.</p>
                  
              </div>
          </Panel>
      </Layout>
    )
  }

}

export default Installations