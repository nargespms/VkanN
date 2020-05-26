<template>
  <div class="q-pa-xl">
    <div class="tableListWrap">
      <tableDataWrap
        module="ticket"
        :columns="columns"
        :endpoint="'/v1/api/vkann/tickets/list'"
        @ticketDelete="ticketDelete"
        @retriveTicket="retriveTicket"
        :key="componentKey"
      />
    </div>
  </div>
</template>

<script>
import tableDataWrap from '../structure/tableDataWrap.vue';

export default {
  name: 'ticketsListCmp',
  components: {
    tableDataWrap,
  },
  data() {
    return {
      columns: [
        {
          lable: 'ticketNum',
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
          lable: 'client',
          filterable: true,
          sortable: true,
          filterType: 'text',
        },
        {
          lable: 'department',
          filterable: true,
          sortable: false,
          filterType: 'DropBox',
        },
        {
          lable: 'service',
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
        {
          lable: 'operation',
          filterable: false,
          sortable: false,
        },
      ],
      componentKey: 0,
    };
  },
  methods: {
    ticketDelete(value) {
      this.$axios
        .delete(`/v1/api/vkann/tickets/${value}`)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.componentKey += 1;
          }
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    retriveTicket(value) {
      this.$axios
        .patch(`/v1/api/vkann/tickets/${value}`)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.componentKey += 1;
          }
        })
        .catch(e => {
          console.log(e.response);
        });
    },
  },
};
</script>

