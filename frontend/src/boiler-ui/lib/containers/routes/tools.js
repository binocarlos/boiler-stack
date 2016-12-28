import { userStatusSelectors } from '../../plugins/user/selectors'

export const mapStateToProps = (state, ownProps) => {
  const statusSelector = userStatusSelectors((state) => state.user.status)
  return {
    router: state.router,
    loggedIn: statusSelector.loggedIn(state) ? true : false,
    loaded: statusSelector.loaded(state)
  }
}