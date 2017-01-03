import Logger from '../../logger'
import deepCheck from 'deep-check-error'

import { takeLatest } from 'redux-saga'
import { fork, put, take, select } from 'redux-saga/effects'

import systemActions from '../../actions/system'

const REQUIRED_SETTINGS = [
  'actions'
]

const SnackbarPluginSaga = (settings = {}) => {
  const actions = settings.actions
  const logger = Logger('saga:snackbar')

  const sagas = [

    // listen for any system mutations and display a snackbar
    function* listenForMutation() {
      function* mutationSnackbar(action) {
        yield put(actions.open(action.payload))
      }
      logger('listening: ' + systemActions.types.mutation)
      yield takeLatest(systemActions.types.mutation, mutationSnackbar)
    }

  ]

  function* root() {
    yield sagas.map(fork)
  }

  return root
}

export default SnackbarPluginSaga