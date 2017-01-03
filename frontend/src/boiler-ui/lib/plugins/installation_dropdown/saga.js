import Logger from '../../logger'
import deepCheck from 'deep-check-error'

import { takeLatest } from 'redux-saga'
import { fork, put, take, select } from 'redux-saga/effects'

const REQUIRED_SETTINGS = [
  'actions'
]

const InstallationDropdownSaga = (settings = {}) => {
  const actions = settings.actions
  const logger = Logger('saga:installation_dropdown')

  const sagas = [

    // listen for any system mutations and display a snackbar
    function* listenForDropdownChange() {
      function* updateUser(action) {
        //yield put(actions.open(action.payload))
        console.log('-------------------------------------------');
        console.log('-------------------------------------------');
        console.log('update user saga')
        console.dir(action)
      }
      logger('listening: ' + actions.types.trigger)
      yield takeLatest(actions.types.trigger, listenForDropdownChange)
    }

  ]

  function* root() {
    yield sagas.map(fork)
  }

  return root
}

export default InstallationDropdownSaga