import Tape from 'tape'
import Schema from '../../../../../src/boiler-ui/lib/utils/form/schema'
import Text from '../../../../../src/boiler-ui/lib/utils/form/text'

import {
  exampleField,
  exampleMeta
} from './tools'

const tape = (name, handler) => Tape('unit -> utils -> form -> schema' + name, handler)

const testSuite = (opts = {}) => {

  tape(' -> constructor', t => {

    const schema = Schema([])

    t.deepEqual(
      schema.initialData(),
      {},
      'blank initial data for blank schema'
    )

    t.deepEqual(
      schema.meta(),
      exampleMeta(),
      'blank meta for blank schema'
    )

    t.end()

  })

  tape(' -> example schema field', t => {

    const schema = Schema([
      exampleField()
    ])

    const data = schema.initialData()
    const meta = schema.meta(data)

    t.deepEqual(
      data,
      {
        fruit: 'apples'
      },
      'initial data'
    )

    t.deepEqual(
      meta,
      exampleMeta({
        testfield: {
          valid: false,
          touched: false,
          error: 'still apples'
        }
      }),
      'initial meta'
    )

    const updated = schema.update('testfield', 'oranges', data, meta)

    t.deepEqual(
      updated.data,
      {
        fruit: 'oranges'
      },
      'data is updated'
    )

    t.deepEqual(
      updated.meta,
      exampleMeta({
        testfield: {
          valid: true,
          touched: false,
          error: null
        }
      }),
      'field is now valid'
    )

    const touchedMeta = schema.touch('testfield', updated.meta)

    t.deepEqual(
      updated.meta,
      exampleMeta({
        testfield: {
          valid: true,
          touched: true,
          error: null
        }
      }),
      'field is now touched'
    )

    t.end()

  })

  tape(' -> custom validation function', t => {

    const schema = Schema([
      exampleField()
    ], {
      validate: (data = {}) => {
        return data.fruit == 'oranges' ?
          'custom oranges error' :
          null
      }
    })

    const data = schema.initialData()
    const meta = schema.meta(data)

    t.deepEqual(
      meta,
      {
        custom_valid: true,
        custom_error: null,
        fields: {
          testfield: {
            valid: false,
            touched: false,
            error: 'still apples'
          }
        }
      },
      'initial meta'
    )

    const updated = schema.update('testfield', 'oranges', {}, meta)

    t.deepEqual(
      updated.meta,
      {
        custom_valid: false,
        custom_error: 'custom oranges error',
        fields: {
          testfield: {
            valid: true,
            touched: false,
            error: null
          }
        }
      },
      'custom error is now active'
    )

    const updated2 = schema.update('testfield', 'pears', {}, meta)

    t.deepEqual(
      updated2.meta,
      {
        custom_valid: true,
        custom_error: null,
        fields: {
          testfield: {
            valid: true,
            touched: false,
            error: null
          }
        }
      },
      'custom error is now ok'
    )

    t.end()

  })

}

export default testSuite
