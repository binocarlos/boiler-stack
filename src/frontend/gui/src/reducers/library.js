import { LIBRARY_REQUEST, LIBRARY_RECEIVE, LIBRARY_ERROR } from '../actions/library'
import apiReducer from '../../../shared/api/reducer'

const reducer = apiReducer([
  LIBRARY_REQUEST,
  LIBRARY_RECEIVE,
  LIBRARY_ERROR
])

export default reducer
