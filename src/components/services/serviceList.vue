<template >
  <div class="q-pa-xl">
    <div class="userManagementListWrap">
      <tableDataWrap module="service" :columns="columns" :endpoint="'/v1/api/vkann/services/list'" />
    </div>
  </div>
</template>

<script>
import tableDataWrap from '../structure/tableDataWrap.vue';

export default {
  name: 'serviceList',
  components: {
    tableDataWrap,
  },
  data() {
    return {
      columns: [
        {
          lable: 'name',
          filterable: true,
          sortable: false,
          filterType: 'text',
        },
        {
          lable: 'client',
          filterable: true,
          sortable: true,
          filterType: 'text',
        },
        {
          lable: 'billingStatus',
          filterable: true,
          sortable: true,
          filterType: 'DropBox',
        },
        {
          lable: 'status',
          filterable: true,
          sortable: false,
          filterType: 'DropBox',
        },
      ],
    };
  },
};
</script>
