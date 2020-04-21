<template>
  <div>
    <div class="userManagementListWrap">
      <tableDataWrap module="invoice" :columns="columns" :endpoint="'/v1/api/vkann/invoices/list'" />
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
  data() {
    return {
      columns: [
        {
          lable: 'number',
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
        { lable: 'amount', filterable: false, sortable: true, filterType: '' },

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
          lable: 'status',
          filterable: true,
          sortable: false,
          filterType: 'DropBox',
        },
        {
          lable: 'official',
          filterable: true,
          sortable: true,
          filterType: '',
        },

        {
          lable: 'type',
          filterable: true,
          sortable: false,
          filterType: 'DropBox',
        },
      ],
    };
  },
};
</script>

