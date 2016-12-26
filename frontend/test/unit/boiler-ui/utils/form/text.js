import Tape from 'tape'
import Text from '../../../../../src/boiler-ui/lib/utils/form/text'

const tape = (name, handler) => Tape('unit -> utils -> form -> text' + name, handler)

const testSuite = (opts = {}) => {

  tape(' -> constructor', t => {

    t.equal(
      Text({ name: 'fruit.red.apples', title: 'Oranges' }).title,
      'Oranges',
      'manual title'
    )

    t.equal(
      Text({ name: 'fruit.red.apples' }).title,
      'Fruit : Red : Apples',
      'auto title'
    )

    t.equal(
      Text('fruit.red.apples').title,
      'Fruit : Red : Apples',
      'auto title from string'
    )

    t.equal(
      Text('fruit.red.apples').name,
      'fruit.red.apples',
      'name from string'
    )

    t.equal(
      Text({ name: 'init', initialValue: 'oranges' }).getInitial(),
      'oranges',
      'with initialValue'
    )

    t.equal(
      Text({ name: 'init' }).getInitial(),
      '',
      'without initialValue'
    )

    t.end()

  })

  tape(' -> get/set', t => {

    t.deepEqual(
      Text({ name: 'fruit.red.apples' })
        .set('juicy', {}),
      {fruit:{red:{apples:'juicy'}}},
      'set'
    )

    t.deepEqual(
      Text({ name: 'fruit.red.apples' })
        .get({fruit:{red:{apples:'juicy'}}}),
      'juicy',
      'get'
    )

    t.end()
  })

  tape(' -> validate', t => {

    t.deepEqual(
      Text({ name: 'fruit', required: true })
        .validate(),
      'required',
      'required with undefined value'
    )

    t.deepEqual(
      Text({ name: 'fruit', required: true })
        .validate(null),
      'required',
      'required with null value'
    )

    t.deepEqual(
      Text({ name: 'fruit', required: true })
        .validate(''),
      'required',
      'required with empty value'
    )

    t.deepEqual(
      Text({ name: 'fruit', required: true })
        .validate('ok'),
      null,
      'required with actual value'
    )

    t.deepEqual(
      Text({ name: 'fruit', minLength: 3 })
        .validate('ok'),
      'must be at least 3 chars',
      'minlength fail'
    )

    t.deepEqual(
      Text({ name: 'fruit', minLength: 3 })
        .validate('okok'),
      null,
      'minlength pass'
    )

    t.deepEqual(
      Text({ name: 'fruit', minLength: 3, required: true })
        .validate(''),
      'required',
      'minlength/required required fail'
    )

    t.deepEqual(
      Text({ name: 'fruit', minLength: 3, required: true })
        .validate('ok'),
      'must be at least 3 chars',
      'minlength/required minlength fail'
    )

    t.deepEqual(
      Text({ name: 'fruit', minLength: 3, required: true })
        .validate('okok'),
      null,
      'minlength/required pass'
    )

    const customValidate = (value) => value.length > 3 ? null : 'oranges'

    t.deepEqual(
      Text({ name: 'fruit', validate: customValidate })
        .validate('ok'),
      'oranges',
      'custom validate fail'
    )

    t.deepEqual(
      Text({ name: 'fruit', validate: customValidate })
        .validate('okok'),
      null,
      'custom validate pass'
    )

    t.end()
  })

}

export default testSuite
