export default {
  setUser({ commit }, { userName }) {
    commit('setUserName', userName);
  },
  setCategory({ commit }) {
    commit('SET_CATEGORY', 'category');
  },
};
