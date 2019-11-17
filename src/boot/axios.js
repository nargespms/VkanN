import axios from 'axios'

// eslint-disable-next-line no-unused-vars
export default ({app, router, Vue}) => {
  Vue.prototype.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios
  //       so you won't necessarily have to import axios in each vue file
}
