import Tape from 'tape'
import FormActions from '../../../../src/boiler-ui/lib/actions/form'

const tape = (name, handler) => Tape('unit -> actions -> form' + name, handler)

const formActionTests = (opts = {}) => {
  
  tape('', t => {
    const actions = FormActions('BASE')

    t.deepEqual(
      actions.types,
      {
        initialize: 'BASE_INITIALIZE',
        load: 'BASE_LOAD',
        inject: 'BASE_INJECT',
        update: 'BASE_UPDATE',
        touch: 'BASE_TOUCH',
        touchform: 'BASE_TOUCHFORM',
        updated: 'BASE_UPDATED',
        revert: 'BASE_REVERT'
      },
      'types'
    )

    t.deepEqual(
      actions.initialize({size:10}), 
      {
        type: 'BASE_INITIALIZE',
        data: {size:10}
      },
      'initialize'
    )

    t.deepEqual(
      actions.load({size:10}, {size:20}), 
      {
        type: 'BASE_LOAD',
        data: {size:10}
      },
      'load'
    )

    t.deepEqual(
      actions.inject({size:10}, {size:20}), 
      {
        type: 'BASE_INJECT',
        data: {size:10},
        meta: {size:20}
      },
      'inject'
    )

    t.deepEqual(
      actions.update('apples.pears', {size:10}), 
      {
        type: 'BASE_UPDATE',
        name: 'apples.pears',
        value: {size:10}
      },
      'update'
    )

    t.deepEqual(
      actions.touch('apples.pears'), 
      {
        type: 'BASE_TOUCH',
        name: 'apples.pears'
      },
      'touch'
    )

    t.deepEqual(
      actions.touchform(),
      {
        type: 'BASE_TOUCHFORM'
      },
      'touchform'
    )

    t.deepEqual(
      actions.updated({size:10}, {size:20}), 
      {
        type: 'BASE_UPDATED',
        data: {size:10},
        meta: {size:20}
      },
      'updated'
    )

    t.deepEqual(
      actions.revert(),
      {
        type: 'BASE_REVERT'
      },
      'revert'
    )

    t.end()
  })


}

export default formActionTests
