<template>
  <div class="q-pa-xl">
    <div class="userManagementListWrap">
      <tableDataWrap
        module="ticket"
        :columns="columns"
        :endpoint="'/v1/api/vkann/tickets/list'"
      />
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
  data() {
    return {
      columns: [
        {
          lable: 'ticketNumber',
          filterable: true,
          sortable: false,
          filterType: 'Text',
        },
        {
          lable: 'title',
          filterable: true,
          sortable: false,
          filterType: 'Text',
        },
        {
          lable: 'departman',
          filterable: true,
          sortable: false,
          filterType: 'Text',
        },
        {
          lable: 'Service',
          filterable: true,
          sortable: false,
          filterType: 'Text',
        },
        {
          lable: 'priority',
          filterable: true,
          sortable: false,
          filterType: 'Text',
        },
        {
          lable: 'clientName',
          filterable: true,
          sortable: true,
          filterType: 'Text',
        },
        {
          lable: 'status',
          filterable: true,
          sortable: true,
          filterType: 'DropBox',
        },
        // {
        //   lable: 'operation',
        //   filterable: false,
        //   sortable: false,
        // },
      ],
    };
  },
};
</script>

<style lang="scss"></style>
