import { make } from 'vuex-pathify';
import mutations from './mutation';
import actions from './action';

const state = {
  count: 0,
  username: 'hello',
  category: '',
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
