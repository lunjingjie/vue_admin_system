const Login = () => import('@/views/login');
const NotFound = () => import('@/views/404');
const Example = () => import('@/views/example');

const routerList = [
  { name: 'Login', path: '/login', component: Login },
  { name: 'Example', path: '/example', component: Example },
  { name: '404', path: '/404', component: NotFound },
];

export default routerList;
