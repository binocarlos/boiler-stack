import Tape from 'tape'
import FormActions from '../../../src/actions/form'

const tape = (name, handler) => Tape('unit -> actions -> form' + name, handler)

const formActionTests = (opts = {}) => {
  
  tape('', t => {
    const actions = FormActions('BASE')

    t.deepEqual(
      actions.types,
      {
        initialize: 'BASE_INITIALIZE',
        inject: 'BASE_INJECT',
        update: 'BASE_UPDATE',
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
      actions.inject({size:10}, {size:20}), 
      {
        type: 'BASE_INJECT',
        data: {size:10},
        meta: {size:20}
      },
      'inject'
    )

    t.deepEqual(
      actions.update('apples.pears', {size:10}, {size:20}), 
      {
        type: 'BASE_UPDATE',
        pathname: 'apples.pears',
        data: {size:10},
        meta: {size:20}
      },
      'update'
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
