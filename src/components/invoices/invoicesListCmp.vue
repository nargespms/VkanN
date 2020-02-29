<template>
  <div>
    <div class="userManagementListWrap">
      <tableDataWrap :endpoint="'/v1/api/vkann/invoices/list'" />
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
