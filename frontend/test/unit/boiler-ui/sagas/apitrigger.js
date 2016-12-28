// listen to a dumb trigger action (trigger)
// run a selector for the payload and one for the query (selectors)
// run the 'request' action of an api action group (handler)
import Tape from 'tape'
import async from 'async'
import SagaTester from 'redux-saga-tester'
import { put, call, take } from 'redux-saga/effects'

import ApiTriggerSaga from '../../../../src/boiler-ui/lib/sagas/apitrigger'
import FormActions from '../../../../src/boiler-ui/lib/actions/form'
import ApiActions from '../../../../src/boiler-ui/lib/actions/api'

const tape = (name, handler) => Tape('unit -> config -> sagas -> submitform' + name, handler)

const testSuite = (opts = {}) => {

  const formactions = FormActions('BASE')
  const apiactions = ApiActions('BASE')

  const FIXTURE = {
    data: {fruit:'apples'},
    meta: {form_touched:true,fields:{fruit:{}}}
  }
  
  const getTester = () => {
    const sagaTester = new SagaTester({
      FIXTURE,
      reducers: {
        test: () => FIXTURE
      }
    })
    sagaTester.start(ApiTriggerSaga({
      trigger: formactions.types.submit,
      handler: apiactions.request,
      selectors: {
        payload: (state) => state.test.data,
        query: (state) => state.test.data.fruit + 15
      }
    }))
    return sagaTester
  }

  tape('', t => {
    const tester = getTester()
    
    tester.dispatch(formactions.submit())

    t.deepEqual(
      tester.getActionsCalled(),
      [
        formactions.submit(),
        apiactions.request(FIXTURE.data, 'apples15')
      ],
      'api request was triggered by form.submit'
    )

    t.end()
  })


}

export default testSuite