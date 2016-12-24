import Tape from 'tape'
import * as tools from '../../../src/actions/tools'

const tape = (name, handler) => Tape('unit -> actions -> tools -> ' + name, handler)

const actionToolsTests = (opts = {}) => {
  
  tape('action', t => {
    t.deepEqual(
      tools.action('APPLES', {count:10}), 
      {
        type: 'APPLES',
        count: 10
      }
    )
    t.end()
  })

  tape('getTypes', t => {
    const actionTypes = tools.getTypes('BASE', ['CLICK', 'TOGGLE'])
    t.deepEqual(
      actionTypes, 
      {
        click: 'BASE_CLICK',
        toggle: 'BASE_TOGGLE'
      }
    )
    t.end()
  })


  tape('createActions', t => {
    const actions = tools.createActions(['CLICK', 'TOGGLE'])('BASE')
    t.deepEqual(
      actions.types, 
      {
        click: 'BASE_CLICK',
        toggle: 'BASE_TOGGLE'
      },
      'types'
    )
    t.deepEqual(
      actions.click(), 
      {
        type: 'BASE_CLICK',
        payload: undefined
      },
      'run function -> no payload'
    )
    t.deepEqual(
      actions.click(10), 
      {
        type: 'BASE_CLICK',
        payload: 10
      },
      'run function -> with payload'
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
      'types'
    )
    t.deepEqual(
      actions.click(10), 
      {
        type: 'BASE_CLICK',
        payload: 10
      },
      'function'
    )
    t.end()
  })
}

export default actionToolsTests
