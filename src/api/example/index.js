/* eslint-disable import/prefer-default-export */
import request from '@/api/request';

/**
 * POST 方式example
 * import { example } from '@/api/example'
 * @param data
 */
export const example = ({ username, password }) => request({
  url: '/user/login',
  method: 'post',
  data: {
    username,
    password,
  },
});

/**
 * GET 方式example
 * @param param
 * import { getList } from '@/api/example'
 */
export const getList = ({ userId }) => request({
  url: '/user/info',
  method: 'get',
  params: {
    userId,
  },
});
