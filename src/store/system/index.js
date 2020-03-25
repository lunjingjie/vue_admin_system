/* eslint-disable max-len */
import { make } from 'vuex-pathify';
import dayjs from 'dayjs';
import axios from '@/api/request';
import systemApi from '@/api/system';

const state = {
  token: null,
  tokenExpire: null,
  username: null,
  roleRouters: null,
};

const actions = {
  /**
   * 登录
   * @param commit
   * @param username
   * @param password
   * @returns {boolean}
   */
  async login({ commit }, { username, password }) {
    let description = '';
    try {
      const res = await systemApi.login({ username, password });
      console.log(res.data);
      description = res.data.description;
      const { token } = res.data;
      const { name } = res.data.user;
      const tokenExpire = dayjs().add(4, 'hour').format('YYYY-MM-DD HH:mm:ss');
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('username', name);
      window.localStorage.setItem('tokenExpire', tokenExpire);
      commit('SET_TOKEN', token);
      commit('SET_USERNAME', name);
      commit('SET_TOKEN_EXPIRE', tokenExpire);
      axios.defaults.headers.common.Authorization = token;
      // 异步获取路由
      // 异步获取对应用户信息
      return {
        description,
        flag: true,
      };
    } catch (e) {
      console.log(e);
      return {
        description,
        flag: false,
      };
    }
  },
  /**
   * 登出
   * @param commit
   */
  logout(context) {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('tokenExpire');
    window.localStorage.removeItem('routes');
    context.commit('SET_TOKEN', null);
    context.commit('SET_USERNAME', null);
    context.commit('SET_TOKEN_EXPIRE', null);
    context.commit('SET_ROLE_ROUTERS', null);
    delete axios.defaults.headers.common.Authorization;
  },
  /**
   * 刷新后判断是否已经登录
   * @param commit
   * @param dispatch
   * @returns {boolean}
   */
  isLogin({ commit, dispatch }) {
    const expireTime = new Date(window.localStorage.getItem('tokenExpire')).getTime();
    const nowTime = new Date().getTime();
    if (expireTime >= nowTime) {
      commit('SET_TOKEN', window.localStorage.getItem('token'));
      commit('SET_USERNAME', window.localStorage.getItem('username'));
      commit('SET_TOKEN_EXPIRE', window.localStorage.getItem('tokenExpire'));
      // commit('SET_ROLE_ROUTERS', window.localStorage.getItem('routes'));
      return true;
    }
    dispatch('logout');
    return false;
  },
};

const mutations = {};

export default ({
  namespaced: true,
  state,
  mutations: {
    ...make.mutations(state),
    ...mutations,
  },
  actions,
});
