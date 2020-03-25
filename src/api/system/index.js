/* eslint-disable import/prefer-default-export */
import request from '@/api/request';

const path = {
  LOGIN: 'wdpAdmin/sys/login',
};
/**
 * login
 */
const login = ({ username, password }) => request({
  url: path.LOGIN,
  method: 'post',
  data: {
    username,
    password,
  },
});

export default {
  login,
};
