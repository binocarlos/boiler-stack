import React, { PropTypes, Component } from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import {
  Table, 
  TableBody, 
  TableHeader,
  TableHeaderColumn, 
  TableRow, 
  TableRowColumn
} from 'material-ui/Table'

const getFieldTitle = (field = {}) => {
  if(field.title) return field.title
  return field.name ?
    field.name.replace(/^\w/, (s) => s.toUpperCase()) :
    ''
}

const getRenderFunction = (field) => {
  return field.render || function(data, field){
    return (
      <div>{data[field.name]}</div>
    )
  }
}

class TableComponent extends Component {

  render() {
  
    const fields = this.props.fields || []
    const items = this.props.items || []
    const selected = this.props.selected || []
    const selectedMap = selected.reduce((map, id) => {
      map[id] = true
    }, {})

    return (
      <Table
        height={this.props.height}
        selectable={this.props.selectable}
        multiSelectable={this.props.multiSelectable}
        onRowSelection={(indexes) => {
          // return an array of ids not indexes
          this.props.onRowSelection(indexes.map(index => {
            return items[index].id
          }))
        }}
      >
      {this.props.showHeader ? (
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={this.props.showCheckboxes}
          enableSelectAll={false}
        >
          <TableRow>
            {fields.map( (field, index) => {
              return (
                <TableHeaderColumn key={index} style={field.headerStyle || field.style}>
                  <div>
                    {getFieldTitle(field)}
                  </div>
                </TableHeaderColumn>
              )
            })}
          </TableRow>
        </TableHeader>
      ) : null}
        <TableBody
          displayRowCheckbox={this.props.showCheckboxes}
          deselectOnClickaway={false}
        >
          {items.map( (row, index) => (
            <TableRow key={index} selected={selectedMap[row.id]}>
              {fields.map( (field, index) => {

                const render = getRenderFunction(field)
                const content = render(row, field)

                const wrappedContent = field.preventRowSelection ?
                  (
                    <div onClick={e => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}>
                      {content}
                    </div>
                  ) :
                  content

                return (
                  <TableRowColumn key={index} style={field.style}>{wrappedContent}</TableRowColumn>
                )
              })}
            </TableRow>
            ))}
        </TableBody>
      </Table>
    )
  }
}

export default muiThemeable()(TableComponent)