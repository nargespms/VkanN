<template>
  <div class="q-pa-xl">
    <profileInfoCmp :data="userData" />
  </div>
</template>

<script>
import profileInfoCmp from '../components/profile/profileInfoCmp.vue';

export default {
  meta() {
    return { title: this.$t('profile') };
  },

  data() {
    return {
      name: 'profile',
    };
  },
  components: {
    profileInfoCmp,
  },
  computed: {
    userData() {
      return this.$store.state.module1.userData;
    },
  },
};
</script>
<style lang="scss"></style>
