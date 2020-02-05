// import { Quasar } from 'quasar';
// import { i18n } from '../boot/i18n.js';
// import store from '../store/index.js';

const routes = [
  {
    path: '/',
    redirect: '/fa',
  },
  // preview layout
  {
    path: '/:locale/preview',
    component: () => import('layouts/preview.vue'),
    children: [
      {
        path: 'invoice',
        component: () => import('pages/previewInvoice.vue'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'SERVICEMANAGER'],
        },
      },
      {
        path: 'contract',
        component: () => import('pages/printContract.vue'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'SERVICEMANAGER'],
        },
      },
    ],
  },
  // print layout
  {
    path: '/:locale/print',
    component: () => import('layouts/print.vue'),
    children: [
      {
        path: 'invoice',
        component: () => import('pages/printInvoice.vue'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'SERVICEMANAGER'],
        },
      },
      {
        path: 'contract',
        component: () => import('pages/printContract.vue'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'SERVICEMANAGER'],
        },
      },
    ],
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
          roles: ['ADMIN', 'BILLING', 'TECH', 'INFO', 'SERVICEMANAGER', 'CLIENT'],
        },
      },
      {
        path: 'search',
        component: () => import('pages/search.vue'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'TECH', 'INFO', 'SERVICEMANAGER', 'CLIENT'],
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
          roles: ['ADMIN', 'BILLING', 'TECH', 'INFO', 'SERVICEMANAGER', 'CLIENT'],
        },
      },
      {
        path: 'profile/:profileId',
        component: () => import('pages/profile'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'TECH', 'INFO', 'SERVICEMANAGER', 'CLIENT'],
        },
      },
      {
        path: 'clients',
        component: () => import('pages/clients'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'TECH', 'SERVICEMANAGER'],
        },
      },
      // tickets
      {
        path: 'tickets',
        component: () => import('pages/tickets'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'TECH', 'SERVICEMANAGER', 'CLIENT'],
        },
      },
      {
        path: 'tickets/ticketsList',
        component: () => import('pages/ticketsList'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'TECH', 'SERVICEMANAGER', 'CLIENT'],
        },
      },
      {
        path: 'tickets/addTicket',
        component: () => import('pages/newTicket'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'TECH', 'SERVICEMANAGER', 'CLIENT'],
        },
      },
      {
        path: 'tickets/:ticket',
        component: () => import('pages/ticket'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'TECH', 'SERVICEMANAGER', 'CLIENT'],
        },
      },
      // tasks
      {
        path: 'tasks',
        component: () => import('pages/tasks'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'TECH', 'SERVICEMANAGER'],
        },
      },

      {
        path: 'tasks/myTasksList',
        component: () => import('pages/myTasksList'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'TECH', 'SERVICEMANAGER'],
        },
      },
      {
        path: 'tasks/tasksList',
        component: () => import('pages/tasksList'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'TECH', 'SERVICEMANAGER'],
        },
      },
      {
        path: 'tasks/addTask',
        component: () => import('pages/addTask'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'TECH', 'SERVICEMANAGER'],
        },
      },
      {
        path: 'tasks/:taskId',
        component: () => import('pages/task'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'TECH', 'SERVICEMANAGER'],
        },
      },
      // files
      {
        path: 'fileManagements',
        component: () => import('pages/fileManagements'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'SERVICEMANAGER', 'CLIENT'],
        },
      },
      {
        path: 'fileManagements/filesList',
        component: () => import('pages/filesList'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'TECH', 'SERVICEMANAGER', 'CLIENT'],
        },
      },
      {
        path: 'fileManagements/uploadFile',
        component: () => import('pages/uploadFile'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'SERVICEMANAGER', 'CLIENT'],
        },
      },

      // services
      {
        path: 'services',
        component: () => import('pages/services'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'TECH', 'SERVICEMANAGER', 'CLIENT'],
        },
      },

      {
        path: 'services/servicesList',
        component: () => import('pages/servicesList'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'TECH', 'SERVICEMANAGER', 'CLIENT'],
        },
      },
      {
        path: 'services/addService',
        component: () => import('pages/addService'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'SERVICEMANAGER'],
        },
      },
      {
        path: 'services/:serviceId',
        component: () => import('pages/service'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'TECH', 'SERVICEMANAGER'],
        },
      },
      // userManagement
      {
        path: 'userManagement',
        component: () => import('pages/userManagement'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'TECH', 'SERVICEMANAGER'],
        },
      },
      {
        path: 'userManagement/staffs',
        component: () => import('pages/staffs'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'SERVICEMANAGER'],
        },
      },
      {
        path: 'userManagement/clients',
        component: () => import('pages/clients'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'TECH', 'SERVICEMANAGER'],
        },
      },
      {
        path: 'userManagement/addMember',
        component: () => import('pages/addMember'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'SERVICEMANAGER'],
        },
      },
      // contracts
      {
        path: 'billing/contracts',
        component: () => import('pages/contracts'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING'],
        },
      },

      {
        path: 'billing/contracts/contractsList',
        component: () => import('pages/contractsList'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING'],
        },
      },
      {
        path: 'billing/contracts/addContract',
        component: () => import('pages/addContract'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING'],
        },
      },
      {
        path: 'billing/contracts/:contractId',
        component: () => import('pages/contract'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING'],
        },
      },
      // invoices
      {
        path: 'billing/invoices',
        component: () => import('pages/invoices'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING'],
        },
      },
      {
        path: 'billing/invoices/invoicesList',
        component: () => import('pages/invoicesList'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING'],
        },
      },
      {
        path: 'billing/invoices/addInvoice',
        component: () => import('pages/addInvoice'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING'],
        },
      },
      {
        path: 'tags',
        component: () => import('pages/tags'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'SERVICEMANAGER'],
        },
      },
      {
        path: 'billing',
        component: () => import('pages/billing'),
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'BILLING', 'SERVICEMANAGER'],
        },
      },
      { path: '*', component: () => import('pages/Error404.vue') },
      { path: '404', component: () => import('pages/E404.vue') },
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
