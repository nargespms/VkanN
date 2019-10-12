
import { Quasar } from 'quasar';
// import { i18n } from '../boot/i18n.js';


const routes = [
  {
    path: '/',
    redirect: `/${Quasar.lang.isoName}`,
  },
  {
    path: '/:locale',
    component: () => import('layouts/default.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'profile', component: () => import('pages/profile') },
      { path: 'clients', component: () => import('pages/clients') },
      { path: 'tickets', component: () => import('pages/tickets') },
      { path: 'tasks', component: () => import('pages/tasks') },
      { path: 'services', component: () => import('pages/services') },
      { path: 'userManagement', component: () => import('pages/userManagement') },
      { path: 'billing', component: () => import('pages/billing') },
      { path: '*', component: () => import('pages/Error404.vue') },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}
// console.log(Quasar.lang.isoName);

export default routes;
