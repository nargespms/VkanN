import Vue from 'vue';
import persianDate from 'persian-date';

// Vue.use(persianDate);

// eslint-disable-next-line no-unused-vars
export default ({ app, router }) => {
  Vue.prototype.$persianDate = persianDate;
  // ^ ^ ^ this will allow you to use this.$persianDate
};
