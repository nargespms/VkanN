<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    // refresh token
    refreshToken() {
      this.$axios
        .get('/v1/api/vkann/refresh-token ')

        .catch(e => {
          if (e.response.status === 403) {
            this.$store.commit('module1/logedInSuccesfully', false, {
              module: 'module1',
            });
            this.$store.commit('module1/userDataFromServer', null, {
              module: 'module1',
            });
            this.$router.push({ path: '/fa/signIn' });
          }
        });
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
  },
  mounted() {},
  //  refresh token
  created() {
    this.refreshToken();
    this.timer = setInterval(this.refreshToken, 3600000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  //  refresh token
};
</script>
