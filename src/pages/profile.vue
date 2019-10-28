<template>
  <div class="q-pa-lg">
    <profileInfoCmp />
  </div>
</template>


<script>
import profileInfoCmp from '../components/profile/profileInfoCmp.vue';

export default {
  data() {
    return {
      name: 'profile',
    };
  },
  components: {
    profileInfoCmp,
  },
};
</script>
<style lang="scss">
</style>
