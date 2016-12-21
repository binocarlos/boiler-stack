import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Layout from './components/layout'
import Router from 'redux-saga-tower/src/react/Router'

const rootElement = (
  <div>
    <Button label="Hello World2!" />
  </div>
)


ReactDOM.render(
  rootElement,
  document.getElementById('mount')
);