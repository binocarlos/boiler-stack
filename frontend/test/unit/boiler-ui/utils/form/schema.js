import Tape from 'tape'
import Schema from '../../../../../src/boiler-ui/lib/utils/form/schema'
import Text from '../../../../../src/boiler-ui/lib/utils/form/text'

import {
  getPathnameValue,
  setPathnameValue
} from '../../../../../src/boiler-ui/lib/tools'

const tape = (name, handler) => Tape('unit -> utils -> form -> schema' + name, handler)

const exampleField = () => {
  return {
    name: 'testfield',
    get: (data = {}) => data.fruit,
    get: getPathnameValue('fruit'),
    set: setPathnameValue('fruit'),
    getInitial: (data = {}) => 'apples',
    validate: (value, data = {}) => value == 'apples' ? 'still apples' : null
  }
}

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
      {},
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
      {
        testfield: {
          valid: false,
          touched: false,
          error: 'still apples'
        }
      },
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
      {
        testfield: {
          valid: true,
          touched: false,
          error: null
        }
      },
      'field is now valid'
    )

    const touchedMeta = schema.touch('testfield', updated.meta)

    t.deepEqual(
      updated.meta,
      {
        testfield: {
          valid: true,
          touched: true,
          error: null
        }
      },
      'field is now touched'
    )

    t.end()

  })

}

export default testSuite
