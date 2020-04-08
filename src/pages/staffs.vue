<template>
  <div class="q-pa-xl">
    <div class="userManagementListWrap">
      <tableDataWrap module="staff" :columns="columns" :endpoint="'/v1/api/vkann/staffs/list'" />
    </div>
  </div>
</template>

<script>
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
          filterType: 'text',
        },
        {
          lable: 'lastName',
          filterable: true,
          sortable: false,
          filterType: 'text',
        },
        {
          lable: 'mobile',
          filterable: true,
          sortable: false,
          filterType: 'text',
        },
        {
          lable: 'role',
          filterable: true,
          sortable: true,
          filterType: 'DropBox',
        },
        {
          lable: 'department',
          filterable: true,
          sortable: true,
          filterType: 'DropBox',
        },
        {
          lable: 'email',
          filterable: true,
          sortable: true,
          filterType: 'text',
        },

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

<style lang="scss"></style>
