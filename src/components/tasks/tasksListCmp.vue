<template>
  <div class="q-pa-xl">
    <div class="userManagementListWrap">
      <tableDataWrap module="task" :columns="columns" :endpoint="'/v1/api/vkann/tasks/list'" />
    </div>
  </div>
</template>

<script>
import tableDataWrap from '../structure/tableDataWrap.vue';

export default {
  name: 'tasksListCmp',
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
          lable: 'title',
          filterable: true,
          sortable: false,
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
          lable: 'assignee',
          filterable: true,
          sortable: true,
          filterType: 'text',
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
