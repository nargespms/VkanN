// import { Quasar } from 'quasar';
// import { i18n } from '../boot/i18n.js';
// import store from '../store/index.js';

const routes = [
  {
    path: '/',
    redirect: '/fa',
  },
  {
    path: '/:locale',
    component: () => import('layouts/default.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/signIn.vue'),
      },
      {
        path: 'dashboard',
        component: () => import('pages/dashboard.vue'),
        meta: {
          requiresAuth: true,
          admin: true,
          billing: true,
        },
      },
      {
        path: 'search',
        component: () => import('pages/search.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'signIn',
        component: () => import('pages/signIn.vue'),
      },
      {
        path: 'signUp',
        component: () => import('pages/signUp.vue'),
      },
      // user
      {
        path: 'profile',
        component: () => import('pages/profile'),
        meta: {
          requiresAuth: true,
          teck: true,
        },
      },
      {
        path: 'profile/:profileId',
        component: () => import('pages/profile'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'clients',
        component: () => import('pages/clients'),
        meta: {
          requiresAuth: true,
          servicemanager: true,
          admin: true,
        },
      },
      // tickets
      {
        path: 'tickets',
        component: () => import('pages/tickets'),
        meta: {
          requiresAuth: true,
          teck: true,
        },
      },
      {
        path: 'tickets/ticketsList',
        component: () => import('pages/ticketsList'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'tickets/addTicket',
        component: () => import('pages/newTicket'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      {
        path: 'tickets/:ticket',
        component: () => import('pages/ticket'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      // tasks
      {
        path: 'tasks',
        component: () => import('pages/tasks'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      {
        path: 'tasks/:taskId',
        component: () => import('pages/task'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },

      {
        path: 'tasks/myTasksList',
        component: () => import('pages/myTasksList'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      {
        path: 'tasks/tasksList',
        component: () => import('pages/tasksList'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      {
        path: 'tasks/addTask',
        component: () => import('pages/addTask'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      // files
      {
        path: 'fileManagements',
        component: () => import('pages/fileManagements'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      {
        path: 'fileManagements/filesList',
        component: () => import('pages/filesList'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      {
        path: 'fileManagements/uploadFile',
        component: () => import('pages/uploadFile'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },

      // services
      {
        path: 'services',
        component: () => import('pages/services'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },

      {
        path: 'services/servicesList',
        component: () => import('pages/servicesList'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      {
        path: 'services/addService',
        component: () => import('pages/addService'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      {
        path: 'services/:serviceId',
        component: () => import('pages/service'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      // userManagement
      {
        path: 'userManagement',
        component: () => import('pages/userManagement'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      {
        path: 'userManagement/staffs',
        component: () => import('pages/staffs'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      {
        path: 'userManagement/clients',
        component: () => import('pages/clients'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      {
        path: 'userManagement/addMember',
        component: () => import('pages/addMember'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      // contracts
      {
        path: 'billing/contracts',
        component: () => import('pages/contracts'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },

      {
        path: 'billing/contracts/contractsList',
        component: () => import('pages/contractsList'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      {
        path: 'billing/contracts/addContract',
        component: () => import('pages/addContract'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      {
        path: 'billing/contracts/:contractId',
        component: () => import('pages/contract'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      {
        path: 'tags',
        component: () => import('pages/tags'),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      {
        path: 'billing',
        component: () => import('pages/billing'),
        meta: {
          requiresAuth: true,
          billing: true,
        },
      },
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
