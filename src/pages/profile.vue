<template>
  <div class="q-pa-xl">
    {{$route.params.profileId}}
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
