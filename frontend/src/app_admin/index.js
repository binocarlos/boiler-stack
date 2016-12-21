import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'react-toolbox/lib/button'

const rootElement = (
  <div>
    <Button label="Hello Admin World2!" />
  </div>
)


ReactDOM.render(
  rootElement,
  document.getElementById('mount')
);