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
          lable: 'asignee',
          filterable: true,
          sortable: true,
          filterType: 'text',
        },
        {
          lable: 'state',
          filterable: true,
          sortable: true,
          filterType: 'DropBox',
        },
      ],
    };
  },
};
</script>

<style lang="scss"></style>
