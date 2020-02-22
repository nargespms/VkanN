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
      },
      {
        path: 'contract',
        component: () => import('pages/printContract.vue'),
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
      },
      {
        path: 'contract',
        component: () => import('pages/printContract.vue'),
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
          roles: ['MANAGER', 'ASSISTANT', 'CLIENT'],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      {
        path: 'search',
        component: () => import('pages/search.vue'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'CLIENT', 'MEMBER'],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      {
        path: 'signIn',
        component: () => import('pages/signIn.vue'),
      },

      // user
      {
        path: 'profile',
        component: () => import('pages/profile'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'CLIENT', 'MEMBER'],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      {
        path: 'profile/:profileId',
        component: () => import('pages/profile'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'CLIENT', 'MEMBER'],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      {
        path: 'clients',
        component: () => import('pages/clients'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'MEMBER'],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      // tickets
      {
        path: 'tickets',
        component: () => import('pages/tickets'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'MEMBER', 'CLIENT'],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      {
        path: 'tickets/ticketsList',
        component: () => import('pages/ticketsList'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'MEMBER', 'CLIENT'],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      {
        path: 'tickets/addTicket',
        component: () => import('pages/newTicket'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'MEMBER', 'CLIENT'],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      {
        path: 'tickets/:ticket',
        component: () => import('pages/ticket'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'MEMBER', 'CLIENT'],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      // tasks
      {
        path: 'tasks',
        component: () => import('pages/tasks'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'MEMBER'],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },

      {
        path: 'tasks/myTasksList',
        component: () => import('pages/myTasksList'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'MEMBER'],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      {
        path: 'tasks/tasksList',
        component: () => import('pages/tasksList'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'MEMBER'],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      {
        path: 'tasks/addTask',
        component: () => import('pages/addTask'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'MEMBER '],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      {
        path: 'tasks/kanBoard',
        component: () => import('pages/kanBoard'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'MEMBER '],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      {
        path: 'tasks/:taskId',
        component: () => import('pages/task'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'MEMBER '],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      // files
      {
        path: 'fileManagements',
        component: () => import('pages/fileManagements'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'MEMBER ', 'CLIENT'],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      {
        path: 'fileManagements/filesList',
        component: () => import('pages/filesList'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'MEMBER ', 'CLIENT'],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      {
        path: 'fileManagements/uploadFile',
        component: () => import('pages/uploadFile'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'MEMBER ', 'CLIENT'],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },

      // services
      {
        path: 'services',
        component: () => import('pages/services'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'MEMBER ', 'CLIENT'],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },

      {
        path: 'services/servicesList',
        component: () => import('pages/servicesList'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'MEMBER ', 'CLIENT'],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      {
        path: 'services/addService',
        component: () => import('pages/addService'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT'],
          dep: ['GENERAL', 'BILLING', 'TECH'],
        },
      },
      {
        path: 'services/:serviceId',
        component: () => import('pages/service'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'MEMBER ', 'CLIENT'],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      // userManagement
      {
        path: 'userManagement',
        component: () => import('pages/userManagement'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'MEMBER '],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      {
        path: 'userManagement/staffs',
        component: () => import('pages/staffs'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT'],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      {
        path: 'userManagement/clients',
        component: () => import('pages/clients'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'MEMBER '],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      {
        path: 'userManagement/addMember',
        component: () => import('pages/addMember'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT'],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      // contracts
      {
        path: 'billing/contracts',
        component: () => import('pages/contracts'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'MEMBER'],
          dep: ['GENERAL', 'BILLING'],
        },
      },

      {
        path: 'billing/contracts/contractsList',
        component: () => import('pages/contractsList'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'CLIENT', 'MEMBER'],
          dep: ['GENERAL', 'BILLING'],
        },
      },
      {
        path: 'billing/contracts/addContract',
        component: () => import('pages/addContract'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT'],
          dep: ['GENERAL', 'BILLING'],
        },
      },
      {
        path: 'billing/contracts/:contractId',
        component: () => import('pages/contract'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'CLIENT', 'MEMBER'],
          dep: ['GENERAL', 'BILLING'],
        },
      },
      // invoices
      {
        path: 'billing/invoices',
        component: () => import('pages/invoices'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'CLIENT', 'MEMBER'],
          dep: ['GENERAL', 'BILLING'],
        },
      },
      {
        path: 'billing/invoices/invoicesList',
        component: () => import('pages/invoicesList'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'CLIENT', 'MEMBER'],
          dep: ['GENERAL', 'BILLING'],
        },
      },
      {
        path: 'billing/invoices/addInvoice',
        component: () => import('pages/addInvoice'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'MEMBER'],
          dep: ['GENERAL', 'BILLING'],
        },
      },
      {
        path: 'tags',
        component: () => import('pages/tags'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT'],
          dep: ['GENERAL', 'BILLING', 'TECH', 'INFO'],
        },
      },
      {
        path: 'billing',
        component: () => import('pages/billing'),
        meta: {
          requiresAuth: true,
          roles: ['MANAGER', 'ASSISTANT', 'CLIENT', 'MEMBER'],
          dep: ['GENERAL', 'BILLING'],
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
