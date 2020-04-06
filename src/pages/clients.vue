<template>
  <div class="q-pa-xl">
    <!-- user management table -->
    <!-- <userManagementList /> -->
    <div class="userManagementListWrap">
      <tableDataWrap module="clients" :columns="columns" :endpoint="'/v1/api/vkann/clients/list'" />
    </div>
  </div>
</template>

<script>
// import userManagementList from '../components/userMangement/userManagementList.vue';

import tableDataWrap from '../components/structure/tableDataWrap.vue';

export default {
  name: 'clients',
  meta() {
    return { title: this.$t('clients') };
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
          lable: 'services',
          filterable: true,
          sortable: false,
          filterType: 'text',
        },
        {
          lable: 'email',
          filterable: true,
          sortable: false,
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
