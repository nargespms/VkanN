<template>
  <div class="q-pa-xl">
    <!-- user management table -->
    <div class="userManagementListWrap">
      <tableDataWrap module="staff" :columns="columns" :endpoint="'/v1/api/vkann/staff/list'" />
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

import tableDataWrap from '../components/structure/tableDataWrap.vue';

export default {
  name: 'staffs',
  meta() {
    return { title: this.$t('staffs') };
  },

  components: {
    tableDataWrap,
  },
  data() {
    return {
      columns: [
        {
          lable: 'firstName',
          filterable: true,
          sortable: false,
          filterType: 'Text',
        },
        {
          lable: 'lastName',
          filterable: true,
          sortable: false,
          filterType: 'Text',
        },
        {
          lable: 'mobile',
          filterable: true,
          sortable: false,
          filterType: 'Text',
        },
        {
          lable: 'role',
          filterable: true,
          sortable: true,
          filterType: 'DropBox',
        },
        {
          lable: 'departman',
          filterable: true,
          sortable: true,
          filterType: 'DropBox',
        },
        // {
        //   lable: 'Todo Task',
        //   filterable: true,
        //   sortable: true,
        //   filterType: 'Number',
        // },
        {
          lable: 'status',
          filterable: true,
          sortable: false,
          filterType: 'DropBox',
        },
        { lable: 'avatar', filterable: false, sortable: false, filterType: '' },
      ],
    };
  },
};
</script>

<style lang="scss">
</style>
