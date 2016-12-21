import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'react-toolbox/lib/button'

import About from './components/About'

const rootElement = (
  <div>
    <Button label="Hello World2!" />
    <div>
      <About />
    </div>
  </div>
)


ReactDOM.render(
  rootElement,
  document.getElementById('mount')
);