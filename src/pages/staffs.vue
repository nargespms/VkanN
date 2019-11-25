<template>
  <div class="q-pa-lg">
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
  components: {
    tableDataWrap,
  },
};
</script>

<style lang="scss">
</style>
