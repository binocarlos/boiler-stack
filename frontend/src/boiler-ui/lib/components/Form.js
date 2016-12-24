import React, { PropTypes, Component } from 'react'

class Form extends Component {

  render() {
    return (
      <section>
        {
          this.props.fields.map((field, i) => {
            return (
              <div key={i}>

              </div>
            )
          })
        }
      </section>
    )
  }
}

Form.propTypes = {
  schema: PropTypes.array.isRequired,
  library: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  meta PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
}

Form.defaultProps = {
  
}

export default Form