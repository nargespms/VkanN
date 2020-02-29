<template>
  <div class="q-pa-xl">
    <!-- user management table -->
    <!-- <userManagementList /> -->
    <div class="userManagementListWrap">
      <tableDataWrap :endpoint="'/v1/api/vkann/clients/list'" />
    </div>
  </div>
</template>

<script>
// import userManagementList from '../components/userMangement/userManagementList.vue';

import tableDataWrap from '../components/structure/tableDataWrap.vue';

export default {
  name: 'clients',
  meta() {
    return { title: this.$t('clients') };
  },

  components: {
    tableDataWrap,
  },
};
</script>

<style lang="scss">
</style>
