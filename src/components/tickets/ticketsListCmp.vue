<template >
  <div class="q-pa-xl">
    <div class="userManagementListWrap">
      <tableDataWrap :endpoint="'/v1/api/vkann/tickets/list'" />
    </div>
  </div>
</template>

<script>
import tableDataWrap from '../structure/tableDataWrap.vue';

export default {
  name: 'ticketsList',
  components: {
    tableDataWrap,
  },
};
</script>

<style lang="scss">
</style>
