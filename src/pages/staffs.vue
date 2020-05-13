<template>
  <div class="q-pa-xl">
    <div class="tableListWrap">
      <tableDataWrap
        module="staff"
        :columns="columns"
        :endpoint="'/v1/api/vkann/staffs/list'"
        @userDelete="userDelete"
        :key="componentKey"
      />
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
      componentKey: 0,

      columns: [
        { lable: 'avatar', filterable: false, sortable: false, filterType: '' },

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
        { lable: 'operation', filterable: false, sortable: false },
      ],
    };
  },
  methods: {
    userDelete(value) {
      this.$axios
        .delete(`/v1/api/vkann/users/${value}`)
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
