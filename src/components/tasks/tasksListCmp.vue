<template>
  <div class="q-pa-xl">
    <div class="tableListWrap">
      <tableDataWrap
        module="task"
        :columns="columns"
        :endpoint="'/v1/api/vkann/tasks/list'"
        @taskDelete="taskDelete"
        @retriveTask="retriveTask"
        :key="componentKey"
      />
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
      componentKey: 0,
      columns: [
        {
          lable: 'taskNum',
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
        { lable: 'operation', filterable: false, sortable: false },
      ],
    };
  },
  methods: {
    taskDelete(value) {
      this.$axios
        .delete(`/v1/api/vkann/tasks/${value}`)
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
    retriveTask(value) {
      this.$axios
        .patch(`/v1/api/vkann/tasks/${value}`)
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

<style lang="scss"></style>
