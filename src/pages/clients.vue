<template>
  <div class="q-pa-lg">
    <!-- user management table -->
    <!-- <userManagementList /> -->
    <div class="userManagementListWrap">
      <tableDataWrap :endpoint="'/statics/clients.json'" />
    </div>
  </div>
</template>

<script>
// import userManagementList from '../components/userMangement/userManagementList.vue';

import tableDataWrap from '../components/structure/tableDataWrap.vue';

export default {
  name: 'clients',
  components: {
    tableDataWrap,
  },
};
</script>

<style lang="scss">
</style>
