<template>
  <div class="q-pa-lg">
    <!-- user management table -->
    <userManagementList />
  </div>
</template>

<script>
import userManagementList from '../components/userMangement/userManagementList.vue';

export default {
  components: {
    userManagementList,
  },
};
</script>

<style lang="scss">
</style>
