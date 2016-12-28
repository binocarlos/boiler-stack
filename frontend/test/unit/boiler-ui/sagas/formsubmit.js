// listen to the submit trigger for a form group
// call the request action of an api group
import Tape from 'tape'
import async from 'async'
import SagaTester from 'redux-saga-tester'
import { put, call, take } from 'redux-saga/effects'

import SubmitFormSaga from '../../../../src/boiler-ui/lib/sagas/formsubmit'
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
    sagaTester.start(SubmitFormSaga({
      trigger: formactions.types.submit,
      selector: (state) => state.test,
      getQuery: (data, meta) => {
        return {
          a: data.fruit + '15'
        }
      },
      handler: apiactions.request
    }))
    return sagaTester
  }

  tape(' -> initialize', t => {
    const tester = getTester()
    
    tester.dispatch(formactions.submit())

    t.deepEqual(
      tester.getActionsCalled(),
      [
        formactions.submit(),
        apiactions.request(FIXTURE.data, {a:'apples15'})
      ],
      'api request was triggered by form.submit'
    )

    t.end()
  })


}

export default testSuite