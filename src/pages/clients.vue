<template>
  <div class="q-pa-xl">
    <div class="tableListWrap">
      <tableDataWrap
        module="clients"
        :columns="columns"
        :endpoint="'/v1/api/vkann/clients/list'"
        @clientDelete="clientDelete"
        :key="componentKey"
      />
    </div>
  </div>
</template>

<script>
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
      componentKey: 0,
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
        { lable: 'operation', filterable: false, sortable: false },
      ],
    };
  },
  methods: {
    clientDelete(value) {
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
