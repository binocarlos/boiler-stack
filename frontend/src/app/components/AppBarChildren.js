import React, { Component, PropTypes } from 'react'

import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import IconMenu from 'material-ui/IconMenu'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import ButtonDropdown from 'kettle-ui/lib/ButtonDropdown'

import tools from '../../schema/tools'

const STYLES = {
  button:{
    backgroundColor: 'transparent',
    color: 'white'
  },
  leftContainer:{
    float:'left'
  },
  rightContainer:{
    float:'right'
  },
  padding:{
    paddingTop:'5px' 
  }
}

class AppBarChildren extends Component {

  getButtonTitle() {
    const currentProject = this.props.projects.filter(project => project.id == this.props.currentProject)[0]
    return currentProject ?
      currentProject.name :
      'Choose project'
  }

  getProjectMenuItems(closeMenuHandler) {

    let projectList = [].concat(this.props.projects || [])
    projectList.sort(tools.nameSort)

    return projectList.map((project, i) => {
      return (
        <MenuItem 
          key={i}
          onTouchTap={() => {
            closeMenuHandler && closeMenuHandler()
            this.props.changeProject(project.littleid)
          }}
          value={project.littleid} 
          primaryText={project.name} />
      )
    })
  }

  getProjectButton() {

    const getDropdownChildren = (closeMenuHandler) => {
      return (
        <Menu>
          {this.getProjectMenuItems(closeMenuHandler)}
        </Menu>
      )
    }

    return (
      <ButtonDropdown
        getChildren={getDropdownChildren}
        buttonclass={FlatButton}
        buttonprops={{
          label:this.getButtonTitle(),
          labelPosition:'before',
          style:STYLES.button,
          icon:<ExpandMoreIcon />
        }} />
    )
  }

  render() {

    if(!this.props.loggedIn) return this.props.children

    return (
      <div>
        <div style={STYLES.leftContainer}>
          <div style={STYLES.padding}>
            {this.getProjectButton()}
          </div>
        </div>
        <div style={STYLES.rightContainer}>
          {this.props.children}  
        </div>
        
      </div>
    )
    
    
  }

}

export default AppBarChildren