/* eslint-disable prefer-destructuring */
import router from './router';
import Store from '@/store';

// 页面级别权限控制
router.beforeEach((to, from, next) => {
  const token = Store.get('system/token');
  const expireTime = new Date(window.localStorage.getItem('tokenExpire')).getTime();
  const nowTime = new Date().getTime();
  if (token !== null) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      next();
    }
  } else if (expireTime >= nowTime) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else if (to.path === '/404') {
      next({ path: '/tableCrud' });
    } else {
      next();
    }
  } else if (to.path === '/login') {
    // 在没有token的情况下，如果当前页为登录页或其他不需要token可以访问的页面，则放行
    next();
  } else {
    next('/login');
  }
});

router.afterEach(() => {
  // 关闭动画
});
