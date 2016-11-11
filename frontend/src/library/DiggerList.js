import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import {List, ListItem} from 'material-ui/List';

import {
  nameSort,
  currency,
  getDiggerArray
} from '../tools'

import {
  diggerSelector
} from '../actions'

import {
  iconFactory
} from '../schema/icons'

const LabourIcon = iconFactory('labour')

/*

  a drop down list populated by a selector

  each item is mapped onto the diggerid
  
*/
class DiggerList extends Component {

  componentDidMount() {
    this.props.requestData()
  }

  getItemList() {
    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </IconMenu>
    )

    return (
      <div>
        <List>
          <Subheader>{this.props.title}</Subheader>
          {
            this.props.data.map(item => {
              return (
                <ListItem
                  key={i}
                  leftAvatar={<Avatar icon={<LabourIcon />} />}
                  primaryText={item.name}
                  rightIconButton={rightIconMenu}
                  secondaryText={
                    <p>
                      <span style={{color: darkBlack}}>{currency(item.price)}</span>
                    </p>
                  }
                  secondaryTextLines={1}
                />
              )
            }).join(<Divider inset={true} />)
          }
        </List>
      </div>
    )
  }
  render() {
    return (
      <div>
        {this.getItemList()}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const tag = ownProps.schema.tag
  const db = state.app.digger[tag]
  const data = getDiggerArray(db)

  return {
    data
  }
}

function mapDispatchToProps(dispatch, ownProps) {

  // the backend digger db section
  const section = ownProps.schema.section

  // where we save the results in the reducer
  const tag = ownProps.schema.tag

  // the query
  const selector = ownProps.schema.selected

  // should we also load from /api/v1/digger/core ?
  const includeCore = ownProps.schema.includeCore

  return {
    requestData:() => {
      dispatch(diggerSelector({
        section,
        tag,
        selector,
        includeCore
      }))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiggerList)