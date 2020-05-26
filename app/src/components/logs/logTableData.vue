<template>
  <div>
    <q-table
      :data="data"
      :columns="columns"
      :rows-per-page-options="[0]"
      row-key="name"
      :filter="tableSearch"
      :separator="separator"
      :pagination.sync="innerPagination"
      binary-state-sort
      class="my-sticky-header-table ticketTable"
      @request="onRequest"
      :dense="$q.screen.lt.sm"
      :grid="$q.screen.lt.sm"
    >
      <!-- search field -->
      <template v-slot:top-right></template>
      <!-- custom header -->
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in columns" :key="col.lable" class="tableHeadCell">
            <!-- name for each column -->
            <span class="columnLabel">{{ $t(col.lable) }}</span>
            <!-- if filterable true in each column it will show an input -->
            <div class="columnFilterWrap" v-if="col.filterable" @click.stop="stopSort">
              <q-input
                outlined
                color="text-black"
                v-if="col.filterType === 'text'"
                class="filterColumnSearch"
                type="text"
                v-model.trim="filter[col.lable]"
                @input="colFilterChange"
                debounce="1000"
                @click="stopSort"
                :placeholder="$t('search')"
              />
            </div>
          </q-th>
        </q-tr>
      </template>
      <!-- custom rows -->

      <template v-slot:body="props">
        <q-tr>
          <q-td>
            <span>{{ props.row.id }}</span>
          </q-td>
          <q-td>{{ props.row.message }}</q-td>
          <q-td>
            <span>{{ $t(props.row.code) }}</span>
          </q-td>
          <q-td>
            <span>{{ $t(props.row.moduleV) }}</span>
          </q-td>
          <q-td>
            <span>
              {{
              new Date(props.row.time).toLocaleDateString(
              `${$route.params.locale}`
              )
              }}
            </span>
          </q-td>
          <q-td>
            <span>{{ $t(props.row.level) }}</span>
          </q-td>
          <q-td>
            <span>{{ $t(props.row.httpStatusCode) }}</span>
          </q-td>
          <q-td>
            <span>{{ $t(props.row.userAgent) }}</span>
          </q-td>
          <q-td>
            <span>{{ $t(props.row.ip) }}</span>
          </q-td>
          <q-td>
            <span>{{ $t(props.row.user) }}</span>
          </q-td>
        </q-tr>
        <!-- expandable row for extra description -->
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'logTableData',
  data() {
    return {
      todayDate: new Date(),
      status: ['active', 'inactive '],
      billingStatusService: ['PAID', 'UNPAID', 'BLOCK'],
      servicesStatus: ['WIP', 'LAUNCHED', 'SUPPORT', 'DEACTIVE'],
      separator: 'cell',
      filter: {},
      tableSearch: '',
      innerPagination: this.pagination,
    };
  },
  props: {
    data: Array,
    columns: Array,
    loading: Boolean,
    pagination: {
      type: Object,
      default: () => ({
        sortBy: 'name',
        descending: false,
        page: 1,
        limit: 10,
        rowsNumber: 10,
      }),
    },
  },
  methods: {
    recordClick(value) {
      this.$emit('onIdClick', value);
    },
    computDate(columnFilterEnddate) {
      return columnFilterEnddate >= this.filter.columnFilterStartdate;
    },

    stopSort(event) {
      event.stopPropagation();
    },
    colFilterChange() {
      this.onRequest({
        pagination: this.innerPagination,
        tableSearch: this.tableSearch,
      });
    },
    onRequest(props) {
      props.filter = this.filter;
      this.innerPagination = props.pagination;
      this.$emit('request', props);
    },
  },
  watch: {
    pagination: {
      handler(newVal) {
        this.innerPagination = newVal;
      },
    },
  },
};
</script>

<style lang="scss">
[dir] .my-sticky-header-column-table td:first-child {
  background-color: #e0e0e0;
}

[dir] .my-sticky-header-column-table tr:first-child th {
  background: #e0e0e0;
}

.filterColumnSearch {
  border-radius: 0;
  background-color: #d8d8d8b3;
  color: #000;
  font-size: 13px;
  margin-top: 8px;
}
.columnFilterWrap {
  display: flex;
  justify-content: center;
  .q-field__control {
    height: unset;
    color: #000 !important;
  }
}
.dropBoxFilterColumn {
  padding: 0px;
  border: none;
}
.columnLabel {
  padding-left: 24px;
  margin-top: 12px;
  padding-right: 12px;
}
.mobileList {
  .mobileItem {
    text-align: center;
    border-bottom: 1px solid #d1d1d1;
  }
  :last-child {
    border-bottom: none;
  }
}
.my-sticky-header-table {
  .row {
    justify-content: space-evenly;
  }
}

.q-table--no-wrap th,
.q-table--no-wrap td {
  white-space: pre;
}
.tableSearchInput * {
  color: #fff !important;
}
</style>
