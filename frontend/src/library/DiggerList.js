import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import AutoComplete from 'material-ui/AutoComplete'
import {grey400, darkBlack, lightBlack, cyan500} from 'material-ui/styles/colors'

import {
  nameSort,
  diggerTypeSort,
  currency,
  getDiggerArray
} from '../tools'

import {
  diggerSelector
} from '../actions'

import {
  getItemIcon,
  ICONS
} from '../schema/icons'

const styles = {
  listContainer:{
    width:'300px',
    maxWidth:'300px'
  }
}
/*

  a drop down list populated by a selector

  each item is mapped onto the diggerid
  
*/
const iconButtonElement = (
  <IconButton
    touch={true}
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
)

class DiggerList extends Component {

  componentDidMount() {
    this.props.requestData()
  }

  getAutoComplete() {
    return (
      <AutoComplete
        floatingLabelText={this.props.title}
        hintText="Search..."
        filter={AutoComplete.fuzzyFilter}
        dataSource={this.props.autoCompleteData}
        maxSearchResults={5}
        onNewRequest={(item, index) => {
          if(index<0) return
          this.props.addItem(item)
        }}
        dataSourceConfig={{
          text:'name',
          value:'id'
        }}
      />
    )
  }

  getItemList() {

    return (
      <div style={styles.listContainer}>
        <List>
          {
            this.props.data.map((item, i) => {
              
              const getSecondaryText = this.props.schema.getSecondaryText ?
                this.props.schema.getSecondaryText(item) :
                null

              const iconClass = ICONS[getItemIcon(item)]

              const rightIconMenu = (
                <IconMenu iconButtonElement={iconButtonElement}>
                  <MenuItem
                    onTouchTap={() => {
                      this.props.changeItem(item, 1)
                    }}>Increase</MenuItem>
                  <MenuItem
                    onTouchTap={() => {
                      this.props.changeItem(item, -1)
                    }}>Reduce</MenuItem>
                  <MenuItem
                    onTouchTap={() => {
                      this.props.deleteItem(item)
                    }}>Delete</MenuItem>
                </IconMenu>
              )

              const itemName = item._count > 1 ?
                item.name + ' x ' + item._count :
                item.name

              return (
                <ListItem
                  key={i}
                  leftIcon={React.createElement(iconClass, {color:cyan500})}
                  primaryText={itemName}
                  rightIconButton={rightIconMenu}
                  secondaryText={getSecondaryText}
                  secondaryTextLines={1}
                />
              )
            })
          }
        </List>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.getAutoComplete()}
        {this.getItemList()}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const tag = ownProps.schema.tag
  const db = state.app.digger[tag] || {}
  const itemIds = ownProps.value || []

  const mapAutocompleteData = ownProps.schema.mapAutocompleteData ?
    ownProps.schema.mapAutocompleteData :
    (data) => data

  let data = []
  let autoCompleteData = []

  if(db && db.data){
    const state = db.data
    const allItems = getDiggerArray(state)

    data = (ownProps.value || []).map(item => {
      return Object.assign({}, state.db[item.id], {
        id:item.id,
        _count:item.count
      })
    })

    data.sort(diggerTypeSort)

    autoCompleteData = allItems.map(item => {
      return Object.assign({}, mapAutocompleteData(item), {
        id:item._digger.diggerid
      })
    })

    if(ownProps.schema.mapAutocompleteData){
      autoCompleteData = autoCompleteData.map(ownProps.schema.mapAutocompleteData)
    }

    autoCompleteData.sort(nameSort)
  }

  return {
    data,
    autoCompleteData
  }
}

function mapDispatchToProps(dispatch, ownProps) {

  // the backend digger db section
  const section = ownProps.schema.section

  // where we save the results in the reducer
  const tag = ownProps.schema.tag

  // the query
  const selector = ownProps.schema.selector

  // should we also load from /api/v1/digger/core ?
  const includeCore = ownProps.schema.includeCore

  const insertItem = (id, direction = 1) => {
    let idArray = ownProps.value || []
    let existing = (ownProps.value || []).filter(item => item.id == id)[0]

    if(existing){
      existing.count += direction

      if(existing.count<=0){
        idArray = idArray.filter(item => item.id != id)
      }
    }
    else{
      idArray.push({
        id:id,
        count:1
      })
    }
    ownProps.update(idArray)
  }

  const deleteItem = (id) => {
    let idArray = ownProps.value || []
    idArray = idArray.filter(item => {
      return item.id != id
    })
    ownProps.update(idArray)
  }

  return {
    requestData:() => {
      dispatch(diggerSelector({
        section,
        tag,
        selector,
        includeCore
      }))
    },
    addItem:(item) => {
      insertItem(item.id)      
    },
    changeItem:(item, direction) => {
      insertItem(item.id, direction)
    },
    deleteItem:(item) => {
      deleteItem(item.id)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiggerList)