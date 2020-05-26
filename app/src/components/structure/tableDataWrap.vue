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
      @userDelete="userDelete"
    />
    <clientsTableData
      v-if="this.module === 'clients'"
      :data="data"
      :columns="columns"
      :loading="loading"
      @request="onRequest"
      :pagination="pagination"
      @onIdClick="onIdClick"
      @clientDelete="clientDelete"
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
      @ticketDelete="ticketDelete"
      @retriveTicket="retriveTicket"
    />
    <invoiceTableData
      v-if="this.module === 'invoice'"
      :data="data"
      :columns="columns"
      :loading="loading"
      @request="onRequest"
      :pagination="pagination"
    />
    <quoteTableData
      v-if="this.module === 'quote'"
      :data="data"
      :columns="columns"
      :loading="loading"
      @request="onRequest"
      :pagination="pagination"
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
      @taskDelete="taskDelete"
      @retriveTask="retriveTask"
    />
    <logTableData
      v-if="this.module === 'logs'"
      :data="data"
      :columns="columns"
      :loading="loading"
      @request="onRequest"
      :pagination="pagination"
    />
  </div>
</template>

<script>
import staffTableData from '../userMangement/staffTableData.vue';
import clientsTableData from '../userMangement/clientsTableData.vue';
import serviceTableData from '../services/serviceTableData.vue';
import ticketTableData from '../tickets/ticketTableData.vue';
import invoiceTableData from '../invoices/invoiceTableData.vue';
import quoteTableData from '../invoices/quoteTableData.vue';
import contractTableData from '../contracts/contractTableData.vue';
import taskTableData from '../tasks/taskTableData.vue';
import logTableData from '../logs/logTableData.vue';

export default {
  name: 'tableDataWrap',
  components: {
    staffTableData,
    clientsTableData,
    serviceTableData,
    ticketTableData,
    invoiceTableData,
    quoteTableData,
    contractTableData,
    taskTableData,
    logTableData,
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
      },
    };
  },
  methods: {
    onIdClick(value) {
      this.$emit('pickerInfo', value);
    },
    onRequest(props) {
      console.log(props);

      const { page, limit, rowsNumber, sortBy, descending } = props.pagination;
      const { tableSearch, filter } = props;

      this.loading = true;

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
          this.loading = false;

          const paginaton = {
            rowsNumber: response.data.result.totalDocs,
            rowsPerPage: response.data.result.limit,
            page,
            limit,
            sortBy,
            descending,
          };

          this.pagination = { ...this.pagination, ...paginaton };
          this.data = response.data.result.docs;

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
        })
        .catch(e => {
          if (e.response.status === 404) {
            this.$q.notify({
              message: this.$t('noResults'),
              color: 'negative',
              icon: 'warning',
              position: 'top',
            });
          }
        });
    },
    ticketDelete(value) {
      this.$emit('ticketDelete', value);
    },
    retriveTicket(value) {
      this.$emit('retriveTicket', value);
    },
    taskDelete(value) {
      this.$emit('taskDelete', value);
    },
    retriveTask(value) {
      this.$emit('retriveTask', value);
    },
    userDelete(value) {
      this.$emit('userDelete', value);
    },
    clientDelete(value) {
      this.$emit('clientDelete', value);
    },
  },
  mounted() {
    this.onRequest({
      pagination: this.pagination,
      tableSearch: undefined,
    });
    if (this.$route.query) {
      this.onRequest({
        pagination: this.pagination,
        filter: { ...this.$route.query },
      });
    }
  },
};
</script>
<style lang="scss">
.q-table__top {
  padding: 28px;
}
</style>
