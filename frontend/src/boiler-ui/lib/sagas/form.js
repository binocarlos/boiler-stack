import Logger from '../logger'
import deepCheck from 'deep-check-error'
import { takeLatest } from 'redux-saga'
import { put, call } from 'redux-saga/effects'

const REQUIRED_SETTINGS = [
  'schema',
  'actions.types.initialize',
  'actions.types.load',
  'actions.types.update',
  'actions.inject',
  'actions.updated'
]

const FormSagaFactory = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = settings.actions
  const schema = settings.schema
  const triggers = actions.types
  const logger = Logger('saga:form:' + actions.base)

  function* initializeSaga(action) {
    console.log('-------------------------------------------');
    console.dir(action)
  }

  function* root() {
    yield takeLatest(triggers.initialize, initializeSaga)
  }

  return root
}

export default FormSagaFactory