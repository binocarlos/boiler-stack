import { fork } from 'redux-saga/effects'

const factory = (sagas = []) => {
  return function *root() {
    yield sagas.map(fork)
  }
}

export default factory