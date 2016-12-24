import Tape from 'tape'
import * as tools from '../../../src/actions/tools'

const tape = (name, handler) => Tape('unit -> actions -> tools' + name, handler)

const actionToolsTests = (opts = {}) => {
  
  tape('', t => {

    t.deepEqual(
      tools.action('APPLES', {count:10}), 
      {
        type: 'APPLES',
        count: 10
      },
      'action'
    )

    t.deepEqual(
      tools.getTypes('BASE', ['CLICK', 'TOGGLE']), 
      {
        click: 'BASE_CLICK',
        toggle: 'BASE_TOGGLE'
      },
      'getTypes'
    )

    t.deepEqual(
      tools.createActions(['CLICK', 'TOGGLE'])('BASE').types, 
      {
        click: 'BASE_CLICK',
        toggle: 'BASE_TOGGLE'
      },
      'createActions -> types'
    )

    t.deepEqual(
      tools.createActions(['CLICK', 'TOGGLE'])('BASE').click(),
      {
        type: 'BASE_CLICK',
        payload: null
      },
      'run function -> no payload'
    )

    t.deepEqual(
      tools.createActions(['CLICK', 'TOGGLE'])('BASE').click(10),
      {
        type: 'BASE_CLICK',
        payload: 10
      },
      'run function -> with payload'
    )

    const toggleActions = tools.createActions(['TOGGLE'])
    const clickActions = tools.createActions(['CLICK'])
    const mergedActions = tools.mergeActions('BASE', [
      toggleActions,
      clickActions
    ])

    t.deepEqual(
      mergedActions.types, 
      {
        click: 'BASE_CLICK',
        toggle: 'BASE_TOGGLE'
      },
      'mergeActions -> types'
    )
    t.deepEqual(
      mergedActions.click(10), 
      {
        type: 'BASE_CLICK',
        payload: 10
      },
      'mergeActions -> function'
    )


    t.end()
    
  })

}

export default actionToolsTests
