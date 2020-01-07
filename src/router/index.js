import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '../store/index.js';

import routes from './routes';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function(/* { store, ssrContext } */) {
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
  // Router.beforeEach((to, from, next) => {
  //   // See if any of the matched routes has meta "requiresAuth"
  //   if (to.matched.some(route => route.meta.requiresAuth)) {
  //     // Yes this route requires authentication. See if the user is authenticated.
  //     if (store.getters.module1.isAuthenticated) {
  //       // User is authenticated, we allow access.
  //       next();
  //     } else {
  //       // User is not authenticated. We can redirect her to
  //       // our login page. Or wherever we want.
  //       next('/login');
  //     }
  //   } else {
  //     next();
  //   }
  // });
  return Router;
}
