<template >
  <div class="q-pa-xl">
    <div class="tableListWrap">
      <tableDataWrap module="logs" :columns="columns" :endpoint="'/v1/api/vkann/logs/list'" />
    </div>
  </div>
</template>

<script>
import tableDataWrap from '../components/structure/tableDataWrap.vue';

export default {
  name: 'logs',
  meta() {
    return { title: this.$t('logs') };
  },
  components: {
    tableDataWrap,
  },
  data() {
    return {
      columns: [
        {
          lable: 'id',
          filterable: true,
          sortable: false,
          filterType: 'text',
        },
        {
          lable: 'message',
          filterable: true,
          sortable: false,
          filterType: 'text',
        },
        {
          lable: 'code',
          filterable: true,
          sortable: false,
          filterType: 'text',
        },
        {
          lable: 'moduleV',
          filterable: true,
          sortable: false,
          filterType: 'text',
        },
        { lable: 'time', filterable: false, sortable: true, filterType: '' },

        {
          lable: 'level',
          filterable: true,
          sortable: false,
          filterType: 'text',
        },
        {
          lable: 'httpStatusCode',
          filterable: true,
          sortable: false,
          filterType: 'Date',
        },
        {
          lable: 'userAgent',
          filterable: true,
          sortable: false,
          filterType: 'Date',
        },
        {
          lable: 'ip',
          filterable: true,
          sortable: false,
          filterType: 'DropBox',
        },
        {
          lable: 'user',
          filterable: true,
          sortable: false,
          filterType: '',
        },
      ],
    };
  },
};
</script>

