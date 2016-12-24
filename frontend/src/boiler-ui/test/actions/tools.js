import tape from 'tape'

import * as tools from '../../src/actions/tools'

const runTests = (opts = {}) => {
  
  tape('action creator', t => {
    t.deepEqual(
      tools.action('APPLES', {count:10}), 
      {
        type: 'APPLES',
        count: 10
      },
      'action created'
    )
    t.end()
  })

  tape('getTypes -> types', t => {
    const actionTypes = tools.getTypes('BASE', ['CLICK', 'TOGGLE'])
    t.deepEqual(
      actionTypes, 
      {
        click: 'BASE_CLICK',
        toggle: 'BASE_TOGGLE'
      },
      'action types'
    )
    t.end()
  })


  tape('createActions -> types', t => {
    const actions = tools.createActions(['CLICK', 'TOGGLE'])('BASE')
    t.deepEqual(
      actions.types, 
      {
        click: 'BASE_CLICK',
        toggle: 'BASE_TOGGLE'
      },
      'action types'
    )
    t.end()
  })

  tape('createActions -> run function', t => {
    const actions = tools.createActions(['CLICK', 'TOGGLE'])('BASE')
    t.deepEqual(
      actions.click(), 
      {
        type: 'BASE_CLICK',
        payload: undefined
      },
      'action received : no payload'
    )
    t.deepEqual(
      actions.click(10), 
      {
        type: 'BASE_CLICK',
        payload: 10
      },
      'action received : with payload'
    )
    t.end()
  })

  tape('mergeActions', t => {

    const toggleActions = tools.createActions(['TOGGLE'])
    const clickActions = tools.createActions(['CLICK'])
    const actions = tools.mergeActions('BASE', [
      toggleActions,
      clickActions
    ])
    t.deepEqual(
      actions.types, 
      {
        click: 'BASE_CLICK',
        toggle: 'BASE_TOGGLE'
      },
      'merged types'
    )
    t.deepEqual(
      actions.click(10), 
      {
        type: 'BASE_CLICK',
        payload: 10
      },
      'merged function'
    )
    t.end()
  })
}

export default runTests
