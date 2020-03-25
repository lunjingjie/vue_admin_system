/* eslint-disable no-param-reassign */

export default {
  increment(state) {
    state.count += 1;
  },
  setUserName(state, userName) {
    state.username = userName;
  },
};
