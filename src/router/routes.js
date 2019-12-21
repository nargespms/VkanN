// import { Quasar } from 'quasar';
// import { i18n } from '../boot/i18n.js';

const routes = [
  {
    path: '/',
    redirect:'/fa',
  },
  {
    path: '/:locale',
    component: () => import('layouts/default.vue'),
    children: [
      { path: '', component: () => import('pages/signIn.vue') },
      { path: 'dashboard', component: () => import('pages/dashboard.vue') },
      { path: 'search', component: () => import('pages/search.vue') },
      { path: 'signIn', component: () => import('pages/signIn.vue') },
      { path: 'signUp', component: () => import('pages/signUp.vue') },
      // user
      { path: 'profile', component: () => import('pages/profile')},
      { path: 'profile/:profileId', component: () => import('pages/profile')},
      { path: 'clients', component: () => import('pages/clients') },
      // tickets
      { path: 'tickets', component: () => import('pages/tickets')},
      { path: 'tickets/ticketsList', component: () => import('pages/ticketsList') },
      { path: 'tickets/addTicket', component: () => import('pages/ticket')},
      // tasks
      { path: 'tasks', component: () => import('pages/tasks')},
      { path: 'tasks/:taskId', component: () => import('pages/task')},

      { path: 'tasks/myTasksList', component: () => import('pages/myTasksList') },
      { path: 'tasks/tasksList', component: () => import('pages/tasksList') },
      { path: 'tasks/addTask', component: () => import('pages/addTask') },
      // files
      { path: 'fileManagements', component: () => import('pages/fileManagements') },
      { path: 'fileManagements/filesList', component: () => import('pages/filesList') },
      { path: 'fileManagements/uploadFile', component: () => import('pages/uploadFile') },

      // services
      { path: 'services', component: () => import('pages/services')},

      { path: 'services/servicesList', component: () => import('pages/servicesList') },
      { path: 'services/addService', component: () => import('pages/addService') },
      { path: 'services/:serviceId', component: () => import('pages/service')},
      // userManagement
      {
        path: 'userManagement',
        component: () => import('pages/userManagement'),
      },
      {
        path: 'userManagement/staffs',
        component: () => import('pages/staffs'),
      },
      {
        path: 'userManagement/clients',
        component: () => import('pages/clients'),
      },
      {
        path: 'userManagement/addMember',
        component: () => import('pages/addMember'),
      },
      // contracts
      {
        path: 'billing/contracts',
        component: () => import('pages/contracts'),
      },

      {
        path: 'billing/contracts/contractsList',
        component: () => import('pages/contractsList'),
      },
      {
        path: 'billing/contracts/addContract',
        component: () => import('pages/addContract'),
      },
      {
        path: 'billing/contracts/:contractId',
        component: () => import('pages/contract'),
      },
      { path: 'tags', component: () => import('pages/tags') },
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
