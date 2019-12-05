<template >
  <div>
    <q-table
      :data="data"
      :columns="columns"
      row-key="name"
      :title="$t('userManagement')"
      :filter="filter"
      :separator="separator"
      :pagination.sync="innerPagination"
      binary-state-sort
      :loading="loading"
      class="my-sticky-header-table"
      @request="onRequest"
      :dense="$q.screen.lt.sm"
      :grid="$q.screen.lt.sm"
    >
      <!-- search field -->
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" :placeholder="$t('Search')">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <!-- custom header -->
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in columns" :key="col.name" :props="props" class="tableHeadCell">
            <!-- name for each column -->
            <span class="columnLabel">{{ col.label }}</span>
            <!-- if filterable true in each column it will show an input -->
            <span class="columnFilterWrap" v-if="col.filterable">
              <input
                class="filterColumnSearch"
                type="text"
                v-model="columnFilter[col.name]"
                @input="colFilterChange"
                @click="stopSort"
                :placeholder="$t('search')"
              />
            </span>
          </q-th>
        </q-tr>
      </template>
      <!-- custom rows -->
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="prop in props.row" :key="prop.id">
            <!-- names with link -->
            <span v-if="prop == props.row['name']">
              <router-link
                class="listNameTable"
                :to="'/' +$route.params.locale "
              >#{{ props.row.name }}</router-link>
              <q-btn
                class="expandTable"
                :props="props"
                dense
                round
                flat
                :icon="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'"
                @click="props.expand = !props.expand"
              />
            </span>
            <span v-if="prop !== props.row['name'] && prop !== props.row['__index']">{{prop}}</span>
          </q-td>
        </q-tr>
        <!-- expandable row for extra description -->
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">{{ props.row.name }}.</div>
          </q-td>
        </q-tr>
      </template>
      <!-- for responsive  -->

      <template v-slot:item="props">
        <q-card class="q-ma-xs q-pa-sm">
          <q-list dense class="mobileList">
            <!-- <q-item v-for="col in props.cols" :key="col.id">
              <q-item-section>
                <q-item-label>{{ col.label }}</q-item-label>
              </q-item-section>
            </q-item>-->
            <q-item class="mobileItem" v-for="prop in props.row" :key="prop.id">
              <q-item-section>
                <span v-if="prop == props.row['name']">
                  <router-link
                    class="listNameTable"
                    :to="'/' +$route.params.locale + '/' + 'profile' +'/' "
                  >#{{ props.row.name }}</router-link>
                </span>
                <q-item-label
                  v-if="prop !== props.row['name'] && prop !== props.row['__index']"
                >{{prop}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </template>

      <!-- for responsive  -->
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'tableData',
  data() {
    return {
      separator: 'cell',
      columnFilter: {},
      filter: '',
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
        rowsPerPage: 5,
        rowsNumber: 10,
      }),
    },
  },
  methods: {
    stopSort(event) {
      event.stopPropagation();
    },
    colFilterChange() {
      this.onRequest({
        pagination: this.innerPagination,
        filter: this.filter,
      });
    },
    onRequest(props) {
      props.columnFilter = this.columnFilter;
      this.innerPagination = props.pagination;
      this.$emit('request', props);
    },
    // onRequest(props) {
    //   const {
    //     page,
    //     rowsPerPage,
    //     rowsNumber,
    //     sortBy,
    //     descending,
    //   } = props.pagination;
    //   const { filter } = props;
    //   console.log(props);
    //   this.loading = true;
    //   this.$axios
    //     .get('', {
    //       params: {
    //         page,
    //         rowsPerPage,
    //         rowsNumber,
    //         sortBy,
    //         descending,
    //         filter,
    //       },
    //     })
    //     .then(response => {
    //       this.pagination.rowsNumber = response.data.rowsNumber;
    //       this.data1.splice(0, this.data1.length, ...response.data.rows);
    //       // don't forget to update local pagination object
    //       this.pagination.page = page;
    //       this.pagination.rowsPerPage = rowsPerPage;
    //       this.pagination.sortBy = sortBy;
    //       this.pagination.descending = descending;
    //       this.loading = false;
    //     });
    // },
  },
};
</script>

<style lang="scss">
.userManagementListWrap {
  .q-field__native,
  .q-field__prefix,
  .q-field__suffix {
    color: #fff !important;
  }
  .q-icon {
    color: #fff;
  }
  .expandTable {
    .q-icon {
      color: #666;
    }
  }
  .q-table__sort-icon {
    color: #666;
  }
  .q-table__top {
    .q-field__control {
      border-bottom: 1px solid #b4b4b4;
    }
  }
  .listNameTable,
  .q-table thead th {
    color: #000;
    font-family: 'ShabnamBold';
    font-size: 16px;
    padding-top: 23px;
  }
}
[dir] .my-sticky-header-column-table td:first-child {
  background-color: #e0e0e0;
}
[dir] .q-table__top {
  background-color: #2f2f2f;
  color: #fff !important;
}
[dir] .q-table__bottom {
  background-color: #2f2f2f;
  color: #fff !important;
}
[dir] .my-sticky-header-column-table tr:first-child th {
  background: #e0e0e0;
}

.filterColumnSearch {
  border-radius: 0;
  background-color: #d8d8d8b3;
  border: 1px solid #a2a2a2;
  color: #000;
  font-size: 13px;
  padding: 2px 4px;
  margin-top: 8px;
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
</style>
