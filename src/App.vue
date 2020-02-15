<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    // refreshToken() {
    //   setInterval(
    //     this.$axios.get('/v1/api/vkann/refresh-token').then(res => console.log(res)),
    //     3000
    //   );
    // },
  },
  mounted() {
    // this.refreshToken();
  },
};
</script>
