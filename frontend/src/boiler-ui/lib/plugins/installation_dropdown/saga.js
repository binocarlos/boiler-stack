import Logger from '../../logger'
import deepCheck from 'deep-check-error'

import { takeLatest } from 'redux-saga'
import { fork, put, take, select } from 'redux-saga/effects'

import systemActions from '../../actions/system'

const REQUIRED_SETTINGS = [
  'actions',
  'userActions',
  'selectors.userdata',
  'selectors.installations'
]

const InstallationDropdownSaga = (settings = {}) => {
  const actions = settings.actions
  const userActions = settings.userActions
  const selectors = settings.selectors
  const logger = Logger('saga:installation_dropdown')

  const sagas = [

    // listen for any system mutations and display a snackbar
    function* listenForDropdownChange() {
      function* updateUser(action) {
        const userData = yield select(selectors.userdata)
        const installations = yield select(selectors.installations)
        const currentInstallationId = action.payload

        const currentInstallationObj = installations
          .filter(installation => installation.id == currentInstallationId)[0]
          
        const installationTitle = currentInstallationObj ?
          currentInstallationObj.name :
          ''

        const newUserData = Object.assign({}, userData, {
          currentInstallation: currentInstallationId
        })
        yield put(userActions.update.request({
          data: newUserData
        }))
        yield take(userActions.update.types.success)
        yield put(userActions.status.api.request())
        yield put(systemActions.mutation({
          message: installationTitle + ' activated'
        }))
      }
      logger('listening: ' + actions.types.trigger)
      yield takeLatest(actions.types.trigger, updateUser)
    }

  ]

  function* root() {
    yield sagas.map(fork)
  }

  return root
}

export default InstallationDropdownSaga