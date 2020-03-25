const Login = () => import('@/views/login');
const NotFound = () => import('@/views/404');
const TableCrud = () => import('@/views/table-crud');

const routerList = [
  { name: 'Login', path: '/login', component: Login },
  { name: 'tableCrud', path: '/tableCrud', component: TableCrud },
  { name: '404', path: '/404', component: NotFound },
];

export default routerList;
