/* eslint-disable max-len */
import { make } from 'vuex-pathify';

const state = {
  toolBar: true,
  sideNav: false,
  navItem: {},
};

const actions = {
};

const mutations = {
};

export default ({
  namespaced: true,
  state,
  mutations: {
    ...make.mutations(state),
    ...mutations,
  },
  actions,
});
