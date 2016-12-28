import { takeLatest } from 'redux-saga'
import deepCheck from 'deep-check-error'
import { fork, put, call, take, select } from 'redux-saga/effects'

const REQUIRED_SETTINGS = [
  'trigger',
  'actions.closeConfirmDelete',
  'actions.tableSelected',
  'actions.requestData',
  'actions.userEvent'
]

const DeleteSuccessSaga = (settings = {}) => {
  
  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = settings.actions
  const trigger = settings.trigger

  function* confirmDelete(action) {
    yield put(actions.closeConfirmDelete())
    yield put(actions.tableSelected([]))
    yield put(actions.requestData())
    yield put(actions.userEvent({
      message:'Deleted ' + ids.length + ' item' + (ids.length == 1 ? '' : 's'),
      snackbar:true
    }))
  }

  function* listener() {
    yield takeLatest(trigger, confirmDelete)
  }

  return listener
}

export default DeleteSuccessSaga