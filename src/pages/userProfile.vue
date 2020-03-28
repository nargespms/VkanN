<template>
  <div class="q-pa-xl">
    <userProfileCmp />
  </div>
</template>


<script>
import userProfileCmp from '../components/userMangement/userProfileCmp.vue';

export default {
  name: 'userProfile',
  components: {
    userProfileCmp,
  },
};
</script>
