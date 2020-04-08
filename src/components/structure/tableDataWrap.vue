<template>
  <div>
    <staffTableData
      v-if="this.module === 'staff'"
      :data="data"
      :columns="columns"
      :loading="loading"
      @request="onRequest"
      :pagination="pagination"
      @onIdClick="onIdClick"
    />
    <clientsTableData
      v-if="this.module === 'clients'"
      :data="data"
      :columns="columns"
      :loading="loading"
      @request="onRequest"
      :pagination="pagination"
      @onIdClick="onIdClick"
    />
    <serviceTableData
      v-if="this.module === 'service'"
      :data="data"
      :columns="columns"
      :loading="loading"
      @request="onRequest"
      :pagination="pagination"
      @onIdClick="onIdClick"
    />
    <ticketTableData
      v-if="this.module === 'ticket'"
      :data="data"
      :columns="columns"
      :loading="loading"
      @request="onRequest"
      :pagination="pagination"
      @onIdClick="onIdClick"
    />
    <invoiceTableData
      v-if="this.module === 'invoice'"
      :data="data"
      :columns="columns"
      :loading="loading"
      @request="onRequest"
      :pagination="pagination"
      @onIdClick="onIdClick"
    />
    <contractTableData
      v-if="this.module === 'contract'"
      :data="data"
      :columns="columns"
      :loading="loading"
      @request="onRequest"
      :pagination="pagination"
      @onIdClick="onIdClick"
    />
    <taskTableData
      v-if="this.module === 'task'"
      :data="data"
      :columns="columns"
      :loading="loading"
      @request="onRequest"
      :pagination="pagination"
      @onIdClick="onIdClick"
    />
  </div>
</template>

<script>
import staffTableData from '../userMangement/staffTableData.vue';
import clientsTableData from '../userMangement/clientsTableData.vue';
import serviceTableData from '../services/serviceTableData.vue';
import ticketTableData from '../tickets/ticketTableData.vue';
import invoiceTableData from '../invoices/invoiceTableData.vue';
import contractTableData from '../contracts/contractTableData.vue';
import taskTableData from '../tasks/taskTableData.vue';

export default {
  name: 'tableDataWrap',
  components: {
    staffTableData,
    clientsTableData,
    serviceTableData,
    ticketTableData,
    invoiceTableData,
    contractTableData,
    taskTableData,
  },
  props: ['endpoint', 'columns', 'module'],
  data() {
    return {
      data: [],
      loading: false,
      tableSearch: '',
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        limit: 10,
        rowsNumber: 10,
      },
    };
  },
  methods: {
    onIdClick(value) {
      console.log(value);
      this.$emit('pickerInfo', value);
    },
    onRequest(props) {
      const { page, limit, rowsNumber, sortBy, descending } = props.pagination;
      const { tableSearch, filter } = props;
      console.log(props);
      this.loading = true;
      console.log(props);
      this.$axios
        .get(this.endpoint, {
          params: {
            page,
            limit,
            rowsNumber,
            sortBy,
            descending,
            tableSearch,
            filter,
          },
        })
        .then(response => {
          console.log(response.data);
          this.data = response.data.result.docs;
          this.pagination.rowsNumber = response.data.result.length;
          // don't forget to update local pagination object
          this.pagination.page = page;
          this.pagination.limit = limit;
          this.pagination.sortBy = sortBy;
          this.pagination.descending = descending;
          this.loading = false;
          // test sort by
          if (sortBy) {
            this.data.sort((a, b) => {
              const x = descending ? b : a;
              const y = descending ? a : b;
              if (sortBy === 'desc') {
                // string sort
                // eslint-disable-next-line no-nested-ternary
                return x[sortBy] > y[sortBy]
                  ? 1
                  : x[sortBy] < y[sortBy]
                  ? -1
                  : 0;
              }
              // numeric sort
              return parseFloat(x[sortBy]) - parseFloat(y[sortBy]);
            });
          }
        });
    },
  },
  mounted() {
    this.onRequest({
      pagination: this.pagination,
      tableSearch: undefined,
    });
    console.log(this.endpoint);
  },
};
</script>
