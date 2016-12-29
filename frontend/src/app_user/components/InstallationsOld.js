import React, { Component, PropTypes } from 'react'
import Navigation from 'react-toolbox/lib/navigation'
import Link from 'react-toolbox/lib/link'

import Layout from '../../boiler-ui/lib/components/Layout'
import ButtonMenu from '../../boiler-ui/lib/components/ButtonMenu'
import icons from '../config/icons'

class Installations extends Component {

  render() {

    const panelBarContent = (
      
      <Navigation type='horizontal'>
        <ButtonMenu
          buttonProps={{
            label: 'Add',
            icon: 'add'
          }}
          items={[
            ['Test1', 'inbox', '/'],
            ['Test2', 'inbox', '/'],
          ]}
        />
      </Navigation>
            
    )

    return (
      <Layout
        panelBarContent={panelBarContent}
        panelBarProps={{
          title: 'Companies',
          flat: true,
          leftIcon: icons.installation
        }}
      >
  
        <div>
            table
        </div>
              
      </Layout>
    )
  }

}

export default Installations