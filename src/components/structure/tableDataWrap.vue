<template>
  <div>
    <!-- table data -->
    <tableData
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
import tableData from './tableData.vue';

export default {
  name: 'tableDataWrap',
  components: {
    tableData,
  },
  props: ['endpoint'],
  data() {
    return {
      data: [],
      columns: [],
      loading: true,
      filter: '',
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        limit: 5,
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
      const { filter, columnFilter } = props;
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
            filter,
            columnFilter,
          },
        })
        .then(response => {
          console.log(response.data);
          this.columns = response.data.columns;
          this.data = response.data.docs;
          this.pagination.rowsNumber = response.data.data.length;
          // this.data1.splice(0, this.data1.length, ...response.data.rows);
          // don't forget to update local pagination object
          this.pagination.page = page;
          this.pagination.limit = limit;
          this.pagination.sortBy = sortBy;
          this.pagination.descending = descending;
          this.loading = false;
          // this.$forceUpdate();
          console.log(this.data);
          console.log(this.columns);
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
          // test sort by
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            icon: 'report_problem',
          });
        });
    },
  },
  mounted() {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined,
    });
  },
};
</script>
