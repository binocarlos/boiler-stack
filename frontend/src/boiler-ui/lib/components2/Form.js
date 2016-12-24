import React, { PropTypes, Component } from 'react'
import Biro from 'biro'
import muiLibrary from '../../../biro-material-ui/lib'
import muiLayout from '../../../biro-material-ui/lib/layout'
import ButtonRow from '../../../kettle-ui/lib/ButtonRow'
import Paper from 'material-ui/Paper'
import Divider from './Divider'

const STYLES = {
  outerwrapper:{
    margin:'30px'
  },
  innerwrapper:{
    padding:'30px'
  },
  marginTop:{
    marginTop:'20px'
  }
}

class Form extends Component {

  render() {

    const library = Object.assign({}, muiLibrary, this.props.library)
    
    return (
     
      <div style={STYLES.outerwrapper}>
        <Paper zDepth={2}>
          <div style={STYLES.innerwrapper}>
            <Biro 
              data={this.props.data}
              meta={this.props.meta}
              schema={this.props.schema}
              update={this.props.update} 
              getContext={this.props.getContext}
              library={library}
              layout={muiLayout} />
          </div>
        </Paper>
      </div>

    )
  }
}

export default Form