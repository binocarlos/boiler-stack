/*

  saga for processing form updates and validation

  2 events that start the process:

   * initialize - a new item is being created
   * load - an existing item if being edited

  Dispatching either action signifies that a new `schema` should be loaded

  The schema is an array of objects with the following fields:

   * name
   * get(data = {})               - return the current value (data is the whole item)
   * getInitial(data = {})        - return the default value (if there is no value found)
   * set(value, data = {})        - inject the current value into the item data
   * validate(value, data = {})   - return null if the value is correct or a string for an error
                                  - return a function that returns a promise for async validation

  You pass a `getSchema` function that is called with the data that was passed to
  `initilize` or `load`

  The schema is then iterated and meta generated for each field before 'inject' is called
  with data and meta

  The difference between `initilize` or `load` is that `getInitial` is called for 
  each field for `initilize`

  The key properties of the meta data:

  {
    'address.city': {
      valid: true,
      touched: false,
      error: null
    },
    'address.postcode': {
      valid: false,
      touched: true,
      error: 'must have a space'
    }
  }

*/
import Logger from '../logger'
import deepCheck from 'deep-check-error'
import { takeLatest } from 'redux-saga'
import { put, call, fork } from 'redux-saga/effects'

const REQUIRED_SETTINGS = [
  'getSchema',
  'actions.types.initialize',
  'actions.types.load',
  'actions.types.update',
  'actions.inject',
  'actions.updated'
]

const FormSagaFactory = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = settings.actions
  const getSchema = settings.getSchema
  const triggers = actions.types
  const logger = Logger('saga:form:' + actions.base)

  function* initializeSaga(action) {
    console.log('-------------------------------------------');
    console.dir(action)
  }

  function* loadSaga(action) {
    console.log('-------------------------------------------');
    console.dir(action)
  }

  function* updateSaga(action) {
    console.log('-------------------------------------------');
    console.dir(action)
  }

  function* touchSaga(action) {
    console.log('-------------------------------------------');
    console.dir(action)
  }

  function* root() {

    function* listenInitialize() {
      yield takeLatest(triggers.initialize, initializeSaga)  
    }

    function* listenLoad() {
      yield takeLatest(triggers.load, loadSaga)  
    }

    function* listenUpdate() {
      yield takeLatest(triggers.update, updateSaga)  
    }

    function* listenTouch() {
      yield takeLatest(triggers.touch, touchSaga)  
    }

    yield [
      fork(listenInitialize),
      fork(listenLoad),
      fork(listenUpdate),
      fork(listenTouch)
    ]
  }

  return root
}

export default FormSagaFactory