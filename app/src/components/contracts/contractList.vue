<template >
  <div class="q-pa-xl">
    <div class="tableListWrap">
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
          lable: 'service',
          filterable: true,
          sortable: false,
          filterType: 'text',
        },
        {
          lable: 'client',
          filterable: true,
          sortable: false,
          filterType: 'text',
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
          lable: 'formal',
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
