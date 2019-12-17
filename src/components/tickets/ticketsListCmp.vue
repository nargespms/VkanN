<template >
  <div class="q-pa-xl">
    <div class="userManagementListWrap">
      <tableDataWrap :endpoint="'/statics/tickets.json'" />
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
