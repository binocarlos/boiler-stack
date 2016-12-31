import React, { Component, PropTypes } from 'react'
import Page from '../../boiler-ui/lib/components/Page'

import Link from './Link'

import Table from 'react-toolbox/lib/table';

const UserModel = {
  name: {type: String},
  twitter: {type: String},
  birthdate: {type: Date,
    title: 'Date of Birth'},
  cats: {type: Number},
  dogs: {type: Number},
  active: {type: Boolean}
};

const users = [
  {name: 'Javi Jimenez', twitter: '@soyjavi', birthdate: new Date(1980, 3, 11), cats: 1},
  {name: 'Javi Velasco', twitter: '@javivelasco', birthdate: new Date(1987, 1, 1), dogs: 1, active: true}
];

class TableExperiment extends Component {

  state = { selected: [], source: users };

  handleChange = (row, key, value) => {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  };

  handleSelect = (selected) => {
    this.setState({selected});
  };

  render() {

    return (
      <Page>
        this is the table experiment page. Below is a react table
        <Table
          model={UserModel}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          selectable
          multiSelectable
          selected={this.state.selected}
          source={this.state.source}
        />
        <p>
          <Link href="/">Dashboard</Link>
        </p>
      </Page>
    )
  }

}

export default TableExperiment