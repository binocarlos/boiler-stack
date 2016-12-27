import Tape from 'tape'
import Schema from '../../../../../src/boiler-ui/lib/utils/schema'
import Text from '../../../../../src/boiler-ui/lib/utils/schema/text'

import {
  exampleField,
  exampleMeta
} from './tools'

const tape = (name, handler) => Tape('unit -> utils -> schema' + name, handler)

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
          touched: false,
          error: null
        }
      }),
      'field is now valid'
    )

    const touchedMeta = schema.touch('testfield', updated.meta)

    t.deepEqual(
      touchedMeta,
      exampleMeta({
        testfield: {
          touched: true,
          error: null
        }
      }),
      'field is now touched'
    )

    t.end()

  })

  tape(' -> update one field does not untouch another', t => {

    const schema = Schema([
      exampleField('email', 'email', ''),
      exampleField('password', 'password', '')
    ])

    const updated = schema.update('password', 'a', {}, {})
    const touchedMeta = schema.touch('password', updated.meta)
    const updated2 = schema.update('email', 'a', updated.data, touchedMeta)

    t.equal(updated2.meta.fields.password.touched, true, 'password field is still touched')
    t.end()

  })

  tape(' -> update one field does not mutate the meta', t => {

    const schema = Schema([
      exampleField()
    ])

    const data = schema.initialData()
    const meta = schema.meta(data)

    t.equal(meta.fields.testfield.error, 'still apples', 'initial error')

    const updated = schema.update('testfield', 'oranges', data, meta)

    t.equal(meta.fields.testfield.error, 'still apples', 'still initial error')

    t.end()

  })

  tape(' -> compare function', t => {

    const schema = Schema([
      exampleField()
    ])

    const data = schema.initialData()

    t.equal(schema.compare('testfield', 'apples', data), true, 'the compare yielded true')
    t.equal(schema.compare('testfield', 'oranges', data), false, 'the compare yielded false')
    
    t.end()

  })

  tape(' -> touch form', t => {

    const schema = Schema([
      exampleField()
    ])

    t.equal(schema.touchForm({}).form_touched, true, 'form_touched is true')

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
        custom_error: null,
        form_touched: false,
        fields: {
          testfield: {
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
        custom_error: 'custom oranges error',
        form_touched: false,
        fields: {
          testfield: {
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
        custom_error: null,
        form_touched: false,
        fields: {
          testfield: {
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
