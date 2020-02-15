<template>
  <div class="q-pa-xl">
    <!-- user management table -->
    <div class="userManagementListWrap">
      <tableDataWrap :endpoint="'/statics/user.json'" />
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

import tableDataWrap from '../components/structure/tableDataWrap.vue';

export default {
  name: 'staffs',
  meta() {
    return { title: this.$t('staffs') };
  },

  components: {
    tableDataWrap,
  },
};
</script>

<style lang="scss">
</style>
