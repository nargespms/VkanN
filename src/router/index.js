import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '../store/index.js';

import routes from './routes';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

// /*
//   This will cehck to see if the user is authenticated or not.
// */
// function requireAuth(to, from, next) {
//   /*
//   Determines where we should send the user.
// */
//   function proceed() {
//     /*
//       If the user has been loaded determine where we should
//       send the user.
//     */
//     if (store.getters.getUserLoadStatus() === 2) {
//       /*
//         If the user is not empty, that means there's a user
//         authenticated we allow them to continue. Otherwise, we
//         send the user back to the home page.
//       */
//       if (store.getters.getUser !== '') {
//         next();
//       } else {
//         next('/dashboard');
//       }
//     }
//   }
// }
export default function({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    // mode: process.env.VUE_ROUTER_MODE,
    mode: 'history',
    base: process.env.VUE_ROUTER_BASE,
  });

  Router.beforeEach((to, from, next) => {
    // See if any of the matched routes has meta "requiresAuth"
    if (to.matched.some(route => route.meta.requiresAuth)) {
      // Yes this route requires authentication. See if the user is not authenticated.
      if (!store.state.module1.logedIn) {
        // User is not authenticated, so we lead him into signIn

        next('/signIn');
      } else {
        const user = JSON.parse(localStorage.getItem('Data'));
        console.log(user.module1.userData.role);
        // admin permission
        if (to.matched.some(route => route.meta.admin)) {
          if (user.module1.userData.role === 'ADMIN') {
            next();
          } else {
            next('/');
          }
          // billing permissions
        } else if (to.matched.some(route => route.meta.billing)) {
          if (user.module1.userData.role === 'BILLING') {
            next();
          } else {
            next('/');
          }
          // teck permissions
        } else if (to.matched.some(route => route.meta.teck)) {
          if (user.module1.userData.role === 'TECH') {
            next();
          } else {
            next('/');
          }
          // info permissions
        } else if (to.matched.some(route => route.meta.info)) {
          if (user.module1.userData.role === 'INFO') {
            next();
          } else {
            next('/');
          }
          // SERVICEMANAGER
        } else if (to.matched.some(route => route.meta.servicemanager)) {
          if (user.module1.userData.role === 'SERVICEMANAGER') {
            next();
          } else {
            next('/');
          }
        }
        // User is not authenticated. We can redirect her to
        // our login page. Or wherever we want.
        next('/');
      }
    } else {
      next();
    }
  });
  return Router;
}
