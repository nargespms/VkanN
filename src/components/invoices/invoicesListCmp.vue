<template>
  <div>
    <div class="userManagementListWrap">
      <tableDataWrap :endpoint="'/statics/tickets.json'" />
    </div>
  </div>
</template>

<script>
import tableDataWrap from '../structure/tableDataWrap.vue';

export default {
  name: 'invoicesList',
  components: {
    tableDataWrap,
  },
};
</script>
