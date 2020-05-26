import Vue from 'vue';
import Vuex from 'vuex';

import module1 from './module1';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      module1,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: process.env.DEV,
  });

  return Store;
}
