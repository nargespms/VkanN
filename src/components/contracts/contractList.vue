<template >
  <div class="q-pa-xl">
    <div class="userManagementListWrap">
      <tableDataWrap
        module="contract"
        :columns="columns"
        :endpoint="'/v1/api/vkann/contracts/list'"
      />
    </div>
  </div>
</template>

<script>
import tableDataWrap from '../structure/tableDataWrap.vue';

export default {
  name: 'contractList',
  components: {
    tableDataWrap,
  },
  data() {
    return {
      columns: [
        {
          lable: 'contractNumber',
          filterable: true,
          sortable: false,
          filterType: 'text',
        },
        {
          lable: 'Service',
          filterable: true,
          sortable: false,
          filterType: 'text',
        },
        {
          lable: 'clientName',
          filterable: true,
          sortable: false,
          filterType: 'Text',
        },
        {
          lable: 'startDate',
          filterable: true,
          sortable: true,
          filterType: 'Date',
        },
        {
          lable: 'endDate',
          filterable: true,
          sortable: true,
          filterType: 'Date',
        },
        {
          lable: 'type',
          filterable: true,
          sortable: false,
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
