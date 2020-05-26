<template>
  <div>
    <div class="tableListWrap">
      <tableDataWrap module="quote" :columns="columns" :endpoint="'/v1/api/vkann/qoutes/list'" />
    </div>
  </div>
</template>

<script>
import tableDataWrap from '../structure/tableDataWrap.vue';

export default {
  name: 'quotesListCmp',
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
          lable: 'issueDate',
          filterable: true,
          sortable: false,
          filterType: 'Date',
        },
        {
          lable: 'validUntil',
          filterable: true,
          sortable: false,
          filterType: 'Date',
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
