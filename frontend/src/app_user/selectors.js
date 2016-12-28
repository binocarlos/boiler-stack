import {
  userSelectors
} from '../boiler-ui/lib/selectors'

export const user = userSelectors(state => state.user)

const selectors = {
  user
}

export default selectors