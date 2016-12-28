import { takeLatest } from 'redux-saga'
import deepCheck from 'deep-check-error'
import { fork, put, call, take, select } from 'redux-saga/effects'

const REQUIRED_SETTINGS = [
  'actions.setData',
  'actions.requestData'
  'triggers.requestData',
  'triggers.dataLoaded'
]

const InitialFormDataSaga = (settings = {}) => {
 
  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = settings.actions
  const triggers = settings.triggers

  // the initial trigger to load some form data
  // add runs a sync local function
  // edit re-triggers an action for a saga to handle
  function* requestInitialFormData(action) {



    yield put(actions.initializeData({}))





    if(action.mode == 'edit'){
      if(!action.query.id) throw new Error('no id query for form:edit -> requestData')
      // clear the data whilst we are loading
      yield put(actions.initializeData({}))
      yield put(actions.requestData(action.query))
    }
    else if(action.mode == 'add'){
      const initialData = yield call(getInitialData, action)
      yield put(actions.meta.initializeData(initialData || {}))
    }
    else{
      throw new Error('unknown form mode ' + mode)
    }
  }

  function* formDataLoaded(action) {
    if(action.mode == 'put'){
      if(!action.query.id) throw new Error('no id query for form:edit -> requestData')
      // clear the data whilst we are loading
      yield put(actions.initializeData({}))
      yield put(actions.requestData(action.query))
    }
    else if(action.mode == 'post'){
      const initialData = yield call(getInitialData, action)
      yield put(actions.meta.initializeData(initialData || {}))
    }
    else{
      throw new Error('unknown form mode ' + mode)
    }
  }

  function* requestDatalistener() {
    yield takeLatest(triggers.requestData, requestInitialFormData)
  }

  function* dataLoadedListener() {
    yield takeLatest(triggers.dataLoaded, requestInitialFormData)
  }

  return function *root() {
    yield sagas.map(fork)
  }

  return listener
}

export default InitialFormDataSaga