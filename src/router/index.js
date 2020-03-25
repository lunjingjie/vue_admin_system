import Vue from 'vue';
import Router from 'vue-router';
import routerList from './routeList';

Vue.use(Router);

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: routerList,
});

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
