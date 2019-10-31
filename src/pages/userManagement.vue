<template>
  <div class="q-pa-lg">
    <userManagementList/>
  </div>
</template>


<script>
import userManagementList from '../components/userMangement/userManagementList.vue';

export default {
  components: {
    userManagementList,
  },
  data() {
    return {
      name: 'userManagement',
    };
  },
};
</script>
<style lang="scss">
</style>
