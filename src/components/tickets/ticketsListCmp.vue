<template>
  <div class="q-pa-xl">
    <div class="userManagementListWrap">
      <tableDataWrap module="ticket" :columns="columns" :endpoint="'/v1/api/vkann/tickets/list'" />
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
          filterType: 'text',
        },
        {
          lable: 'title',
          filterable: true,
          sortable: false,
          filterType: 'text',
        },
        {
          lable: 'clientName',
          filterable: true,
          sortable: true,
          filterType: 'text',
        },
        {
          lable: 'departman',
          filterable: true,
          sortable: false,
          filterType: 'DropBox',
        },
        {
          lable: 'Service',
          filterable: true,
          sortable: false,
          filterType: 'text',
        },
        {
          lable: 'priority',
          filterable: true,
          sortable: false,
          filterType: 'DropBox',
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
